require('./sass/styles.scss')
import * as _ from 'lodash'
import { UI } from './js/ui'

const home = require('./views/pages/home.hbs'),
  ui = new UI()
  ui.render(home)
