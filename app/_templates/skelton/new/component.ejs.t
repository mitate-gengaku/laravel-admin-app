---
to: src/components/<%= h.changeCase.pascal(name) %>/components/<%= h.changeCase.pascal(name) %>.tsx
---

import { use<%= h.changeCase.pascal(name) %> } from "../hooks/use-<%= h.changeCase.paramCase(name) %>"
import { Props } from "../types/type"

const <%= h.changeCase.pascal(name) %> = (props: Props) => {
  const {} = props;
  const {} = use<%= h.changeCase.pascal(name) %>();
  
  return (
    <></>
  )
}

export default <%= h.changeCase.pascal(name) %>;