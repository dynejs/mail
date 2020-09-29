import inlineCss = require('inline-css')
import nodemailer = require('nodemailer')
import { Injectable, Config, Translation, Views } from '@dynejs/core'

export interface Mail {
    from?: string
    to: string
    subject: string
    template: string
    data: any
}

@Injectable()
export class Mailer {

    private translator: Translation

    private views: Views

    private config: Config

    constructor(translator: Translation, views: Views, config: Config) {
        this.translator = translator
        this.views = views
        this.config = config
    }

    async send(props: Mail) {
        const transport = this.getTransport()

        const { from, to, subject, template, data } = props

        data.t = (path) => this.translator.get(path)

        const content = await this.views.render('emails/' + template, data)
        const layout = await this.views.render('emails/layout', { content, data })
        const final = await this.inlineCss(layout)

        return transport.sendMail({
            from: from || this.config.get('mail.from'),
            to,
            subject: subject || '',
            html: final
        })
    }

    getTransport() {
        return nodemailer.createTransport({
            host: this.config.get('mail.host'),
            port: this.config.get('mail.port'),
            secure: this.config.get('mail.secure'),
            auth: {
                user: this.config.get('mail.user'),
                pass: this.config.get('mail.password')
            }
        })
    }

    inlineCss(layout: string) {
        return new Promise((resolve, reject) => {
            inlineCss(layout, { url: this.config.get('url', 'http://localhost') })
                .then(resolve)
                .catch(reject)
        })
    }
}
