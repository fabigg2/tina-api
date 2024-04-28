import sgMail from "@sendgrid/mail";


const sendEmail = async (subject, message, email) => {

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')
  const msg = {
    to: 'fabig4da@gmail.com',
    from: 'cfgarcesg@unipacifico.edu.co',
    subject,
    text: 'Someone is trying to contact you',
    html: `<div>
            <h3>${email} says:</h3>
            <p>${message}</p>
        </div>`,
  }
  return await sgMail.send(msg)
}

export {sendEmail};