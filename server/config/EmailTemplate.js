// export const EMAIL_VERIFY_TEMPLATE = `
// <!DOCTYPE html>
// <html>
// <head>
//     <style>
//         .container {
//             max-width: 600px;
//             margin: 0 auto;
//             padding: 20px;
//             font-family: Arial, sans-serif;
//         }
//         .header {
//             background-color: #f8b133;
//             padding: 20px;
//             text-align: center;
//             border-radius: 5px 5px 0 0;
//         }
//         .content {
//             background-color: #ffffff;
//             padding: 20px;
//             border-radius: 0 0 5px 5px;
//             border: 1px solid #dddddd;
//         }
//         .otp-code {
//             font-size: 32px;
//             font-weight: bold;
//             color: #f8b133;
//             text-align: center;
//             letter-spacing: 5px;
//             margin: 20px 0;
//         }
//         .footer {
//             text-align: center;
//             margin-top: 20px;
//             color: #666666;
//             font-size: 12px;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <div class="header">
//             <h1 style="color: #ffffff; margin: 0;">Email Verification</h1>
//         </div>
//         <div class="content">
//             <p>Hello {{name}},</p>
//             <p>Thank you for registering with us. Please use the following OTP to verify your email address:</p>
//             <div class="otp-code">{{otp}}</div>
//             <p>This OTP will expire in 24 hours. If you didn't request this verification, please ignore this email.</p>
//             <p>Best regards,<br>Your App Team</p>
//         </div>
//         <div class="footer">
//             <p>This is an automated message, please do not reply to this email.</p>
//         </div>
//     </div>
// </body>
// </html>
// `;

// ...existing code...

export const EMAIL_SEND_OTP_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        .header {
            background-color: #f59e0b;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 0 0 5px 5px;
            border: 1px solid #dddddd;
            line-height: 1.6;
        }
        .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #f59e0b;
            text-align: center;
            letter-spacing: 8px;
            margin: 30px 0;
            padding: 20px;
            background-color: #fef3c7;
            border-radius: 8px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #666666;
            font-size: 12px;
        }
        .warning {
            color: #dc2626;
            font-size: 14px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="color: #ffffff; margin: 0;">Verify Your Account</h1>
        </div>
        <div class="content">
            <p>Hello {{name}},</p>
            <p>You requested an OTP for account verification. Please use the following code:</p>
            <div class="otp-code">{{otp}}</div>
            <p>This verification code will expire in 15 minutes for security reasons.</p>
            <p class="warning">If you didn't request this code, please ignore this email and ensure your account security.</p>
            <p>Best regards,<br>Authentication App Team</p>
        </div>
        <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} Authentication App. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

export const EMAIL_RESET_OTP_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
        }
        .header {
            background-color: #dc2626;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 0 0 5px 5px;
            border: 1px solid #dddddd;
            line-height: 1.6;
        }
        .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #dc2626;
            text-align: center;
            letter-spacing: 8px;
            margin: 30px 0;
            padding: 20px;
            background-color: #fee2e2;
            border-radius: 8px;
            border: 2px dashed #dc2626;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #666666;
            font-size: 12px;
        }
        .warning {
            color: #dc2626;
            font-weight: bold;
            font-size: 14px;
            margin-top: 20px;
            padding: 15px;
            background-color: #fee2e2;
            border-radius: 4px;
        }
        .expires {
            background-color: #374151;
            color: #ffffff;
            padding: 10px;
            border-radius: 4px;
            text-align: center;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="color: #ffffff; margin: 0;">Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Hello {{name}},</p>
            <p>We received a request to reset your password. Use the following OTP code to proceed:</p>
            <div class="otp-code">{{otp}}</div>
            <div class="expires">⚠️ This code expires in 15 minutes</div>
            <div class="warning">
                IMPORTANT: If you didn't request a password reset, please ignore this email and secure your account immediately.
            </div>
            <p>For security reasons:</p>
            <ul>
                <li>Never share this code with anyone</li>
                <li>Our team will never ask for this code</li>
                <li>Use a strong password that you don't use elsewhere</li>
            </ul>
            <p>Best regards,<br>Security Team</p>
        </div>
        <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} Authentication App. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

export const EMAIL_WELCOME_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f8fafc;
        }
        .header {
            background-color: #0ea5e9;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 0 0 5px 5px;
            border: 1px solid #e2e8f0;
            line-height: 1.6;
        }
        .welcome-text {
            font-size: 24px;
            font-weight: bold;
            color: #0ea5e9;
            text-align: center;
            margin: 20px 0;
        }
        .email-box {
            background-color: #f0f9ff;
            border: 1px solid #bae6fd;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
            color: #0369a1;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #64748b;
            font-size: 12px;
        }
        .button {
            display: inline-block;
            background-color: #0ea5e9;
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .social-links {
            margin: 20px 0;
            text-align: center;
        }
        .social-links a {
            color: #0ea5e9;
            margin: 0 10px;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="color: #ffffff; margin: 0;">Welcome to Our App! 🎉</h1>
        </div>
        <div class="content">
            <div class="welcome-text">Hello {{name}}!</div>
            <p>Thank you for joining our community. We're excited to have you on board!</p>
            <p>Your account has been created successfully with:</p>
            <div class="email-box">
                {{email}}
            </div>
            <p>What's next?</p>
            <ul>
                <li>Complete your profile</li>
                <li>Explore our features</li>
                <li>Connect with other users</li>
            </ul>
            <div style="text-align: center;">
                <a href="#" class="button">Get Started</a>
            </div>
            <div class="social-links">
                <a href="#">Twitter</a> |
                <a href="#">Facebook</a> |
                <a href="#">Instagram</a>
            </div>
        </div>
        <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} Authentication App. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
