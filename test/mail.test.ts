import assert = require('assert')
import { app, container, BaseModule, Mailer, Views } from '@dynejs/core'
import { MailModule } from '../src'

let mailer = null
let views = null

describe('Mail', () => {
    before(function() {
        app([
            BaseModule,
            MailModule
        ], process.cwd() + '/test')

        mailer = container().resolve(Mailer)
        views = container().resolve(Views)

        // Uncomment to run it
        // this.skip()
    })

    it('should send an email', async function() {
        views.addDir(__dirname + '/views')

        const res = await mailer.send({
            to: 'test@user.com',
            subject: 'Test email',
            template: 'test-mail',
            data: {
                hello: 'World'
            }
        })

        assert(res.accepted[0] === 'test@user.com')
    })
})
