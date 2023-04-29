const { useTheme } = require("@emotion/react");

const Loading = (props) => {
  const theme = useTheme();
  const { text } = props;
  return (
    <>
      <div style={{ width: '100%', display: 'flex' }}>
        <img src={`/images/gifs/${theme.palette.mode == 'dark' ? 'dark' : 'light'}-loading.gif`}
          style={{
            margin: 'auto'
          }} />
      </div>
    </>
  )
}
export default Loading;
