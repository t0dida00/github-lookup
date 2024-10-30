export default async function Page({ params }) {
    const slug = (await params).slug
    return <div>Dynamic route segment /blog/[slug]/page.js: {slug}</div>
}