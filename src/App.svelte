<script>
    import { Router } from '@sveltech/routify'
    import { routes } from '@sveltech/routify/tmp/routes'
    import Tailwindcss from './Tailwindcss.svelte'

    // Uncomment when app peers the aws amplify backend
    //import aws_exports from 'cloud/src/aws-exports'

    async function ready() {
        // Dynamic load the Local AWS Bundle, currently 138kb gzipped
        const AmplifyModule = await import('@aws-amplify/core')

        // Uncomment when setting up auth
        //const AuthModule = await import('./services/auth')
        //await AuthModule.currentAuthenticatedUser()

        return new Promise((resolve, _) => {
            setTimeout(() => resolve('ok'), 1)
        })
    }
</script>

<Tailwindcss />

{#await ready()}
    <h1>Loading</h1>
{:then}
    <Router {routes} />
{/await}
