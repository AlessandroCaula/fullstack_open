const ErrorNotification = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

export default ErrorNotification