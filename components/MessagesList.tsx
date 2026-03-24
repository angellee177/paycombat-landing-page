import React from 'react'

// This wrapper hides the Create New button using CSS
const MessagesList = (props: any) => {
  React.useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      [data-e2e="create-new"] { display: none !important; }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])
  // Render the default list view
  const DefaultList = props.DefaultList || (() => null)
  return <DefaultList {...props} />
}

export default MessagesList
