import { axiosPost } from '../../utils/dataFetch.js';

export const getPayment = async() => {
    // userId, orderId, itemName, totalPrice ...
    const { userId } = JSON.parse(localStorage.getItem("loginInfo"));
    const url = "/payment/kakao/ready"; // 카카오 QR코드를 호출하는 준비를 하는 위치
    const data = {
        "orderId": "", // UUID로 랜덤으로 생성하는 것이 현재 랜덤에서 가장 안전한 방식
        "userId": userId,
        "itemName": "test",
        "qty": "10",
        "totalAmount": "1000"
    }

    try{
        const kakaoReadyResult = await axiosPost(url, data); // 카카오 QR코드를 호출한 결과의 주소를 가지고 있는 객체
        console.log("kakaoReadyResult => ", kakaoReadyResult);
        if(kakaoReadyResult.tid) {
            // 새로운 페이지 연결
            window.location.href = kakaoReadyResult.next_redirect_pc_url;
        }
    } catch(error) {
        console.log("error :: ", error)
    }
}