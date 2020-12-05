import * as fs from 'fs'
import * as path from 'path'
import assert = require('assert')
import { Mailer, testMailer } from '../dist'

const mailer = new Mailer({
    url: 'http://localhost',
    host: '',
    port: '',
    user: '',
    pass: '',
    secure: false,
    driver: testMailer
})

const html = `
<style>
.test {
    border: 1px solid red;
}
</style>
<div class="test">Hello world</div>
`

describe('Mail', () => {
    it('should send an email', async function() {
        await mailer.send({
            to: 'recepient@test.com',
            subject: 'Test email',
            content: html,
            from: 'test@host.com'
        })

        const files = fs.readdirSync(path.join(process.cwd(), 'mails'))
        const file = files[0]
        const content = fs.readFileSync(path.join(process.cwd(), 'mails', file), 'utf8')
        const lines = content.split('\n').filter(_ => _)

        assert(lines[0] === 'FROM: test@host.com')
        assert(lines[1] === 'TO: recepient@test.com')
        assert(lines[2] === 'SUBJECT: Test email')
        assert(lines[4] === '<div class="test" style="border: 1px solid red;">Hello world</div>')
    })
})
