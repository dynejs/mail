import nodemailer = require('nodemailer')

export function nodeMailer(opts) {
    const transport = nodemailer.createTransport({
        host: opts.host,
        port: opts.port,
        secure: opts.secure,
        auth: {
            user: opts.user,
            pass: opts.pass
        }
    })

    return transport.sendMail
}
