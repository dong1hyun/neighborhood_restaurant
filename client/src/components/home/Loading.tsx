import styled, { keyframes } from 'styled-components';

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-100%);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

interface BouncingCircleProps {
    delay: string;
  }

const BouncingCircle = styled.div<BouncingCircleProps>`
  width: 1rem;
  height: 1rem;
  background-color: #333333; /* Tailwind의 bg-blue-700 색상 */
  border-radius: 9999px;
  animation: ${bounceAnimation} 1s infinite;
  margin-top: 70px;
  animation-delay: ${(props) => props.delay};
`;

const Loading = () => (
  <Wrapper>
    <BouncingCircle delay="0s" />
    <BouncingCircle delay="-0.3s" />
    <BouncingCircle delay="-0.5s" />
  </Wrapper>
);

export default Loading;
