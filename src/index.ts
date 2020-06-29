import { Application } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  app.on('issues.opened', async (context) => {
    const issue =  context.payload.issue
    const user = issue.user.login
    const message = `Thanks @${user} for opening this issue`
    const params = context.issue({ body: message })
    if((context.payload.issue.author_association==="OWNER") || (context.payload.issue.author_association=="COLLABORATOR")){
      commands(apps, 'label', (context, command)=>{
        const labels = command.arguments.split(/, */)
        return context.github.issues.addLabels(context.issue({labels}))

      })
    }
    return context.github.issues.createComment(params)
  })
  // For more information on building apps:
  // https://probot.github.io/docs/
  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
