import style from 'styled-components';

const Background = style.div`
  background-image: url('/img/giftBackground.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export default function GiftContainer({children}) {
  return <Background> { children } </Background>
}