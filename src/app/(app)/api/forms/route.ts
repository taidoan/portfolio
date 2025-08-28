import { NextRequest, NextResponse } from 'next/server';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const verifyTurnstileToken = async (token: string) => {
  const formData = new URLSearchParams();
  formData.append('secret', process.env.TURNSTILE_SECRET!);
  formData.append('response', token);

  try {
    const result = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await result.json();

    return {
      success: data.success,
      errorCodes: data.error_codes || [],
      challengeTimestamp: data['challenge_ts'],
      hostname: data.hostname,
    };
  } catch (error) {
    console.error('Error verifying turnstile token:', error);
    return {
      success: false,
      errorCodes: ['verification-request-failed'],
    };
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { form: formID, submissionData, token } = body;
    if (!token) {
      return NextResponse.json({ error: ['No token provided'] }, { status: 400 });
    }

    const verification = await verifyTurnstileToken(token);

    if (!verification.success) {
      console.log('Turnstile verification failed:', verification.errorCodes);
      return NextResponse.json(
        {
          error: [
            {
              message: 'Security check failed, please try again.',
              details: verification.errorCodes,
              status: 403,
            },
          ],
        },
        { status: 403 },
      );
    }

    try {
      const payloadResponse = await fetch(
        `${process.env.PAYLOAD_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL}/api/form-submissions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            form: formID,
            submissionData: submissionData,
            token: token,
          }),
        },
      );

      const payloadData = await payloadResponse.json();

      if (!payloadResponse.ok) {
        return NextResponse.json(
          {
            error: payloadData.errors || [
              { message: 'Error processing form submission', status: payloadResponse.status },
            ],
          },
          { status: payloadResponse.status },
        );
      }

      return NextResponse.json(payloadData);
    } catch (formError) {
      console.error('Error submitting form:', formError);
      return NextResponse.json(
        {
          error: [{ message: 'Error processing form submission', status: 500 }],
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      {
        error: [{ message: 'Internal server error', status: 500 }],
      },
      { status: 500 },
    );
  }
}
