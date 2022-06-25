import LazyCookieWall from "./CookieWall.vue"
import LazyFooter from "./Footer.vue"
import LazyHeader from "./Header.vue"
import LazyImageText from "./ImageText.vue"
import LazyNavigation from "./Navigation.vue"
import LazyText from "./Text.vue"

const themeComponentsMeta = [
  {
    type: "header",
    key: "LazyHeader",
    id: "1",
    fields: []
  },
  {
    type: "text",
    key: "LazyText",
    id: "2",
    fields: []
  },
  {
    type: "footer",
    key: "LazyFooter",
    id: "3",
    fields: []
  },
  {
    type: "navigation",
    key: "LazyNavigation",
    id: "4",
    fields: []
  }
]

export {
  LazyCookieWall,
  LazyFooter,
  LazyHeader,
  LazyImageText,
  LazyNavigation,
  LazyText,
  themeComponentsMeta
}