# RxForms

### Description
Reactive Forms module for angular applications with **input** components type: 

- text
- email
- password
- number
- search
- tel
- url
- currency
- textarea

**Select** and **Switch** components with native *html* and *modern* custom style.

### Dependencies

NPM dependencies for this module:

1. **Reactive Form Validators**
> - [Installation](https://www.npmjs.com/package/@rxweb/reactive-form-validators)
> - [Docs](https://docs.rxweb.io/getting-started)
> - Package `@rxweb/reactive-form-validators`

2. **Ngx Currency**
> - [Installation](https://www.npmjs.com/package/ngx-currency)
> - [Docs](https://nbfontana.github.io/ngx-currency/docs/)
> - Package `ngx-currency`

3. **GSAP**
> - [Installation](https://www.npmjs.com/package/gsap)
> - [Docs](https://greensock.com/docs/)
> - Package `gsap`

4. **RxJS**
> - [Installation](https://www.npmjs.com/package/rxjs)
> - [Docs](https://rxjs.dev/api)
> - Package `rxjs`

5. **TailwindCSS** **`Not required`*
> - [Installation](https://tailwindcss.com/docs/installation/using-postcss)
> - [Docs](https://tailwindcss.com/docs/installation)
> - Package `tailwindcss`

### Style

SCSS Structure to customize component style.

```scss
.form-field-group {
    @apply font-sans space-y-1;

    .title {
        @apply font-light text-lg text-slate-800;

        &.error {
            @apply text-red-400;
        }
    }
    .control-elements {
        @apply flex flex-col;

        .input-text {
            @apply border border-slate-900 focus:border-slate-900 focus:ring-slate-900 p-2 w-full rounded-lg text-slate-800 text-base font-extralight;
        }

        .input-select {
            @apply cursor-pointer border border-slate-900 focus:border-slate-900 focus:ring-slate-900 p-2 w-full rounded-lg text-slate-800 text-base font-extralight;
        }

        .rx-select-contentainer {
            @apply relative;

            .select-body {
                @apply absolute top-0 w-full max-h-60 overflow-y-auto bg-slate-800 py-4 shadow-lg shadow-slate-800/70 rounded-lg pointer-events-none opacity-0 translate-y-1/4;

                &.select-top {
                    @apply top-auto bottom-full;
                }

                .select-option {
                    @apply text-slate-50 font-sans font-light cursor-pointer px-4 py-2 hover:bg-slate-900 duration-200;
                }
            }
        }

        .input-radio {
            @apply accent-slate-800 text-slate-800 focus:ring-slate-800;
        }

        .toggle-native {
            @apply bg-slate-900/20 border-slate-900;

            &:checked,
            &[checked='true'] {
                @apply bg-slate-900;
            }
        }

        .toggle {
            @apply bg-slate-900/20;

            &.active {
                @apply bg-slate-900;
            }

            .switch {
                @apply bg-slate-50;
            }
        }

        .field-error {
            @apply border border-red-400 ring-red-400 focus:border-red-400 focus:ring-red-400;
        }

        .error-message {
            @apply flex h-4 w-full;
            small {
                @apply text-red-400 font-light text-xs font-sans;
            }
        }
    }
}



```

### Components

- #### Input
    <!-- - Html -->

    ``` html

    <rx-input title="Usuario" name="username" placeholder="@juanes" 
        inputType="text" 
        formControlName="username" 
        [control]="form.controls.username">
    </rx-input>

    ```

- #### Select
    <!-- - Html -->

    ``` html

    <rx-select title="Type" placeholder="Selecciona..." name="type" 
        [asyncOptions]="asyncOptions" 
        formControlName="type" 
        [native]="true" 
        [control]="form.controls.type">
    </rx-select>

    ```

- #### Switch
    <!-- - Html -->

    ``` html

    <rx-switch [native]="true" title="Online" name="online" 
        formControlName="online"
        [control]="form.controls.online">
    </rx-switch>
