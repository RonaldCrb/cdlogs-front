export default function (context) {
  if (!context.store.state.auth.token) {
    context.redirect('/auth/signin/')
  }
}
