const { useTheme } = require("@emotion/react");

const Loading = (props) => {
  const theme = useTheme();
  const { text, style } = props;
  return (
    <>
      <div style={{ width: '100%', display: 'flex', height: '100vh' }}>
        <img src={`/images/gifs/${theme.palette.mode == 'dark' ? 'dark' : 'light'}-loading.gif`}
          style={{
            margin: 'auto',
            width: '100%',
            maxWidth: '700px',
            ...style
          }} />
      </div>
    </>
  )
}
export default Loading;
