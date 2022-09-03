# sparkle

## MVP

- [ ] explore
- [ ] landing
- [ ] login
- [ ] hover titles / popover (users, emojis, mentions)
- [x] mentions ( users, channels, roles, everyone, here)
- [ ] bot

## TODO

- [x] make gifs play on hover
- [ ] home page
- [ ] attachments which arent images
- [ ] emoji gifs
- [ ] explore page (just the latest of sparkled messages from all servers)
- [ ] guild settings (trigger emotes, minimal amount of sparkles, public channel)
- [ ] add guild cards with bot invite perms and an invite button in the /guilds/ picker
- [x] guild header
- [ ] guild filters (latest, chronological, most starred)
- [ ] timestamp and link to message

- [ ] create statistics for guilds

## Statistics

- most liked user (top ten)
- most used emote (other than sparkle)

## Turbo

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
yarn run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
