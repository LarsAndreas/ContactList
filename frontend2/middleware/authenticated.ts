
const cookie = useCookie("accessToken");

export default function ({ store, redirect }) {
    // If the user is not authenticated
    if (!cookie.value) {
        return redirect('/login')
    }
}