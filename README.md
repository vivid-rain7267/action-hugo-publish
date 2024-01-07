# Hugo publish action

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/N4N0RM9J1)

Create new content for Hugo website based on issues labeled with `action:publish`

## Using

| input | description | required |
| ---- | ---- | ---- |
| `git-commiter-name` | Name for commiter of changes | `true` |
| `git-commiter-email` | Commiters email | `true` |

Here is an example

```yaml
name: CI

on:
  issues:
    types: [labeled]

jobs:
  build:
    if: github.event.label.name == 'action:publish'
    runs-on: ubuntu-latest

    steps:
      - name: Run martinkukolos/action-hugo-publish@main
        uses: martinkukolos/action-hugo-publish@main
        with:
          git-commiter-name: "Hugo Bot"
          git-commiter-email: ${{ secrets.BotCommiterEmail }}
```

Action above will create new commit but you will need another action to create pull request . You can use [peter-evans/create-pull-request)](https://github.com/peter-evans/create-pull-request) actioin for that.

```diff
steps:
  // your other actions
+ - name: Run peter-evans/create-pull-request@v5
+  uses: peter-evans/create-pull-request@v5
+  with:
+    title: "New Post: ${{ github.event.issue.title }}"
+    body: "Closes #${{ github.event.issue.number }}.\n\n This PR has been generated automatically."
```

To remove labels check [actions-ecosystem/action-remove-labels](https://github.com/actions-ecosystem/action-remove-labels) action.

## License

[MIT](LICENSE)