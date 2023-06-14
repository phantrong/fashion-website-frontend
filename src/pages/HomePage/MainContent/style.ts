import { styled } from 'styled-components';

const WrapperMainContentHome = styled.div`
  display: flex;
  align-items: flex-start;
  min-width: 1140px;
  margin: auto;
  width: 1140px;
  flex-wrap: nowrap;
  background-color: #fafafa;
  flex-direction: column;
  padding-bottom: 30px;
`;

const WrapperDetail = styled.div`
  display: flex;
  align-items: center;
  margin-left: -15px;
  margin-right: -15px;
  flex-wrap: wrap;
`;

const WrapperSeeMore = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  button {
    margin: auto;
    border: solid 1px #ccc;
    color: #2c2c2c;
    padding: 13px 15px;
    width: 160px;
  }
`;

const WrapperDetailItem = styled.div`
  flex: 0 0 25%;
  cursor: pointer;
  padding: 15px;
`;

const WrapperIntroduce = styled.div`
  height: 410px;
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: -10px;
  margin-right: -10px;
  margin-top: 20px;
`;

const FirstIntroduce = styled.div`
  height: 100%;
  flex: 1;
  padding: 0 10px;
`;

const SecondIntroduce = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  margin-left: -10px;
  margin-right: -10px;
  row-gap: 20px;
  padding: 0 10px;
  flex-wrap: wrap;
`;

const SubIntroduceItem = styled.div`
  flex: 0 0 50%;
  padding: 0 10px;
`;

const TitleStyle = styled.h2`
  font-size: 24px;
`;

export {
  WrapperMainContentHome,
  WrapperDetail,
  WrapperDetailItem,
  WrapperIntroduce,
  FirstIntroduce,
  SecondIntroduce,
  SubIntroduceItem,
  TitleStyle,
  WrapperSeeMore,
};
