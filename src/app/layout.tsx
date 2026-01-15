import '../styles/globals.css'

export const metadata = {
  title: 'Image Creatives - Photography Competition',
  description: 'Submit your photography competition entry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
