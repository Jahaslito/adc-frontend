# ADC-frontend

### Tailwind instructions

-   Use the class `font-heading` to use Open Sans font which we agreed is for headings

### App Context

In order that we have a central store of the state of the application we use React Context. To use it...

#### Accessing the context

1.  Import `useContext` into your file, like:

    `import React, { useContext } from "react";`

2.  Import our context too, like this:

    `import { AppContext } from "./util/AppContext";`

3.  Use the context
    Destructure the context item you want to use

    `const { user } = useContext(AppContext);`

    Use or mutate the context data.
