# Black-Jack Ver.2.4
블랙잭 규칙

https://ssigner.github.io/Black_Jack/

기본 용어
1. HIT
- 처음 2장의 상태에서 카드를 더 받는 것
2. STAY
- 추가 카드를 더 이상 받지 않는 것
- 플레이어의 경우, Stay 선언시 딜러가 룰에 따라 Hit을 하거나 Stay를 함
3. BUST
- 카드 총합이 21을 넘는 경우
4. Black Jack
- A한장과 10~K의 조합이 나오는 것. 배팅 금액의 1.5배

게임 진행
1. A는 1 또는 11
- 단, 블랙잭이 되는 경우만 11, 나머지는 1
2. 게임 시작후, 딜러와 플레이어는 각각 2장의 카드를 받는다.
- 딜러는 1장 비공개
- 플레이어가 에이스와 10~K중 한장이 있으면 블랙잭, 1.5배 -> 100원을 걸었으면 250원
3. 플레이어는 블랙잭이 아닌 경우, 카드를 추가로 받을 수 있다. 21이나 초과가 아닌 한 계속 받을 수 있다.
4. 딜러는 플레이어의 추가 카드 받기가 끝난 후, 딜러의 카드가 16점 이하면 Hit, 17점 이상이면 Stay

게임 결과
1. 플레이어 승리 시(딜러 Bust)
- 배팅 금액의 1배 -> 100원을 걸면 200원을 받음
2. 딜러 승리 시(플레이어 Bust)
- 플레이어는 배팅 금액을 잃음

이 프로젝트에서의 진행방법
1. 나타난 배팅칸에 배팅금액 입력

2. play버튼 누르기

3. 받은 카드를 보고, HIT 이나 STAY진행

4. AGAIN? 버튼시 결과에 따라 칩수 반영후 한판더

5. STOP 버튼시 얻은 모든 칩을 하이스코어로 환산후 로컬 스토리지에 저장, 다음에 브라우저를 열 시 반영되어 있음.

*이 프로젝트는 이스터에그가 숨어있습니다.*
