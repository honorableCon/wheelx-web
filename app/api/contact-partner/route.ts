import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, company, category, message } = body;

        // Validation
        if (!name || !email || !company || !category || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_SERVER,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Email content
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #000; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; padding: 10px; background: white; border-left: 4px solid #FFD700; }
        .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🤝 New Partnership Inquiry</h1>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
            </div>
            
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
            </div>
            
            <div class="field">
                <div class="label">Company:</div>
                <div class="value">${company}</div>
            </div>
            
            <div class="field">
                <div class="label">Partnership Category:</div>
                <div class="value">${category}</div>
            </div>
            
            <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
            </div>
        </div>
        <div class="footer">
            <p>This email was sent from the WheelX Partners contact form</p>
            <p>© ${new Date().getFullYear()} WheelX. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `;

        // Send email
        await transporter.sendMail({
            from: `"WheelX Partners" <${process.env.SMTP_USERNAME}>`,
            to: 'baaydaamley@gmail.com, baye.dame@smartdevafrica.com',
            subject: `Partnership Inquiry: ${category} - ${company}`,
            html: emailHtml,
            replyTo: email,
        });

        return NextResponse.json(
            { success: true, message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
