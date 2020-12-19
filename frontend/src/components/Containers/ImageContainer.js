import style from 'styled-components';

const Background = style.div`
  background-image: url('/img/background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export default function ImageContainer({children}) {
  return <Background> { children } </Background>
}