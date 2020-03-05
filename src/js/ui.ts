export class UI {
  render(component: any):void {
    const app = document.querySelector('#app')
    app.innerHTML = component()
  }
}
