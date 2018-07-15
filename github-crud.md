https://developer.github.com/v3/repos/contents/#get-contents
GET /repos/:owner/:repo/contents/:path

https://developer.github.com/v3/repos/contents/#create-a-file
PUT /repos/:owner/:repo/contents/:path

https://developer.github.com/v3/repos/contents/#update-a-file
Update a file
PUT /repos/:owner/:repo/contents/:path


https://developer.github.com/v3/repos/contents/#delete-a-file
DELETE /repos/:owner/:repo/contents/:path


 https://github.com/octokit/rest.js


https://octokit.github.io/rest.js/#api-Repos-getContent

```js
const octokit = require('@octokit/rest')()

 // token (https://github.com/settings/tokens)
octokit.authenticate({
  type: 'token',
  token: 'secrettoken123'
})

```
