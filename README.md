# Dyne Mail

A mailer module for @dynejs/core.

Usage:

```ts
await mailer.send({
    to: 'test@user.com',
    subject: 'Test email',
    template: 'test-mail',
    data: {
        hello: 'World'
    }
})
```
