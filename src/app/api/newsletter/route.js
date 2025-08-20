import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate email
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      return Response.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }
    
    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
    
    // Send confirmation email to subscriber
    await transporter.sendMail({
      from: `"Ghaf Woods" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: "You're ON-BOARD!",
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">
          <!-- Header with logo -->
          <div style="background: linear-gradient(to right, #1c2a18, #2c3b28); padding: 30px 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
            <img src="${process.env.NEXT_PUBLIC_DOMAIN || 'https://ghafwoods.vercel.app'}/assets/gw_logo_light.png" alt="Ghaf Woods Logo" style="max-width: 180px; height: auto;">
          </div>
          
          <!-- Main content -->
          <div style="padding: 40px 30px; background-color: #ffffff; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0;">
            <h2 style="color: #1c2a18; font-family: 'Arial', sans-serif; margin-bottom: 20px; font-size: 24px; font-weight: 600; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px;">Thank You for Subscribing!</h2>
            
            <p style="color: #333; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
              Welcome to the Ghaf Woods circle, where luxury meets nature and exclusivity is just the beginning.
            </p>
            
            <div style="background: linear-gradient(to right, #f7f9f7, #ffffff); border-left: 4px solid #1c2a18; padding: 20px; margin: 25px 0; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
              <p style="color: #1c2a18; margin: 0 0 15px 0; font-weight: bold; font-size: 18px;">Here's what's coming your way:</p>
              <ul style="color: #333; padding-left: 20px; margin: 0;">
                <li style="margin-bottom: 12px; font-size: 16px;">✨ Fresh property drops</li>
                <li style="margin-bottom: 12px; font-size: 16px;">🎯 Subscriber-only offers</li>
                <li style="margin-bottom: 12px; font-size: 16px;">📊 Market scoops</li>
                <li style="margin-bottom: 0; font-size: 16px;">🌳 Community happenings</li>
              </ul>
            </div>
            
            <p style="color: #333; line-height: 1.6; margin-bottom: 10px; font-size: 16px;">
              Stay tuned. Big things are growing.
            </p>
            
            <p style="color: #333; line-height: 1.6; margin: 25px 0 0 0; font-size: 16px; border-top: 1px solid #f0f0f0; padding-top: 20px;">
              Warm regards,<br>
              <span style="font-weight: 500; color: #1c2a18;">– Team Ghaf Woods</span>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #1c2a18; padding: 25px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; box-shadow: 0 -2px 10px rgba(0,0,0,0.05);">
            <p style="color: white; margin: 0 0 5px 0; font-size: 14px;">© ${new Date().getFullYear()} Ghaf Woods. All rights reserved.</p>
            <p style="color: #ccc; margin: 5px 0 0 0; font-size: 12px;">A development by Majid Al Futtaim Properties</p>
          </div>
        </div>
      `
    });
    
    // Send notification to admin
    await transporter.sendMail({
      from: `"Ghaf Woods Newsletter" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "New Newsletter Subscription",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${process.env.NEXT_PUBLIC_DOMAIN || 'https://ghafwoods.vercel.app'}/assets/gw_logo_light.png" alt="Ghaf Woods Logo" style="max-width: 150px; height: auto;">
          </div>
          
          <div style="background: linear-gradient(to right, #1c2a18, #2c3b28); height: 4px; margin-bottom: 25px; border-radius: 2px;"></div>
          
          <h3 style="color: #1c2a18; font-family: 'Arial', sans-serif; margin-bottom: 15px; font-size: 20px; font-weight: 600;">New Newsletter Subscription</h3>
          
          <p style="color: #333; line-height: 1.6; font-size: 16px;">A new user has subscribed to the Ghaf Woods newsletter.</p>
          
          <div style="background: linear-gradient(to right, #f7f9f7, #ffffff); padding: 20px; margin: 20px 0; border-radius: 6px; border-left: 4px solid #1c2a18; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
            <p style="margin: 0 0 10px 0; font-size: 16px;"><strong style="color: #1c2a18;">Email:</strong> ${data.email}</p>
            <p style="margin: 0; font-size: 16px;"><strong style="color: #1c2a18;">Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: linear-gradient(to right, #1c2a18, #2c3b28); padding: 15px; text-align: center; margin-top: 30px; border-radius: 4px;">
            <p style="color: white; margin: 0; font-size: 14px;">© ${new Date().getFullYear()} Ghaf Woods. All rights reserved.</p>
          </div>
        </div>
      `
    });
    
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error processing newsletter subscription:", error);
    return Response.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}



