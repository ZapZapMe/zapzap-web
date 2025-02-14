# ZapZap tipping webapp

Paste a tweet URL ➡️ pay the invoice ➡️ they are notified ➡️ tips are instantly sent to their wallet!

### Using Docker to just run the frontend

```bash
docker build -t zapzap-web -f Dockerfile
docker run -p 3000:3000  -v .:/src zapzap-web # live editing
```

## Releasing with semantic-release

To automate the release process, project uses [semantic-release](https://semantic-release.gitbook.io/semantic-release/).
For more information on how to write commit messages that will be recognized by semantic-release, refer to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

To create a new release, simply run:

```bash
npm run release
```

This will analyze your commits, generate release notes, update the changelog, and create a new release on GitHub.

View the [Firebase Console](https://console.firebase.google.com/u/0/project/zapzap-me/hosting/sites/beta-zap-zap-me) for status



![Screenshots](assets/image.png)

![Screenshots](assets/profile-page.png)


# License

    Copyright 2025 ZapZap Heavy Industries

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
