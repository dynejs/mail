import { Injectable, Module } from '@dynejs/core'
import { Mailer } from './mail'

@Injectable()
export class MailModule extends Module {

    register() {
        this.container.register(Mailer)
    }

}
