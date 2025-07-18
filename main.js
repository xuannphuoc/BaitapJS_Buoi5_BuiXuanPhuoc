/**
 * Bài tập 1 : Quản lý tuyển sinh
 * 
 * Đầu vào :
 * - Người dùng nhập vào:
 *   + Điểm chuẩn
 *   + Điểm 3 môn
 *   + Khu vực
 *   + Đối tượng ưu tiên
 * 
 * Xử lý :
 * - Kiểm tra nếu có môn bị 0 điểm thì rớt
 * - Tính tổng điểm 3 môn
 * - Tính điểm ưu tiên theo khu vực và đối tượng
 * - Cộng tổng điểm + ưu tiên
 * - So sánh với điểm chuẩn để xác định đậu/rớt
 * 
 * Đầu ra :
 * - In ra màn hình cho biết thí sinh đậu hay rớt và tổng điểm
 * 
 */

// Giải bài tập 1
function tinhDiemUuTien(khuVuc, doiTuong) {
    let diemKV = 0;
    let diemDT = 0;

    if (khuVuc === "khuVucA") {
        diemKV = 2;
    } else if (khuVuc === "khuVucB") {
        diemKV = 1;
    } else if (khuVuc === "khuVucC") {
        diemKV = 0.5;
    }

    if (doiTuong === "doiTuong1") {
        diemDT = 2.5;
    } else if (doiTuong === "doiTuong2") {
        diemDT = 1.5;
    } else if (doiTuong === "doiTuong3") {
        diemDT = 1;
    }

    return diemKV + diemDT;
}

function infoKetQua() {
    const diemChuan = document.getElementById("diemChuan").value * 1;
    const diem1 = document.getElementById("diem1").value * 1;
    const diem2 = document.getElementById("diem2").value * 1;
    const diem3 = document.getElementById("diem3").value * 1;
    const khuVuc = document.getElementById("khuVuc").value;
    const doiTuong = document.getElementById("doiTuong").value;

    let ketQua = document.getElementById("infoKetQua");
    let thongBao = "";

    if (diem1 === 0 || diem2 === 0 || diem3 === 0) {
        thongBao = "Bạn đã rớt vì có môn bị 0 điểm";
    } else {
        let tong3Mon = diem1 + diem2 + diem3;
        let diemUuTien = tinhDiemUuTien(khuVuc, doiTuong);
        let tongDiem = tong3Mon + diemUuTien;

        if (tongDiem >= diemChuan) {
            thongBao = "Bạn đã đậu ! ";
        } else {
            thongBao = "Bạn đã rớt ! ";
        }

        thongBao += ` Tổng điểm = ${tongDiem}`;
    }

    ketQua.innerHTML = thongBao;
}

document.getElementById("btnKetQua").onclick = infoKetQua;

/**
 * Bài tập 2 : Tính tiền điện
 * 
 * Đầu vào :
 * - Người dùng nhập vào :
 *      + Họ tên 
 *      + Số kw
 * 
 * Xử lý :
 *    - Nếu soKw <= 50  
 *              => tiền = soKw * 500
 *    - Nếu <= 100      
 *              => tiền = 50*500 + (soKw - 50)*650
 *    - Nếu <= 150      
 *              => tiền = 50*500 + 50*650 + (soKw - 100)*850
 *    - Nếu <= 200      
 *              => tiền = 50*500 + 50*650 + 50*850 + (soKw - 150)*1100
 *    - Nếu > 200       
 *              => tiền = 50*500 + 50*650 + 50*850 + 50*1100 + (soKw - 200)*1300
 * 
 * Đầu ra :
 *    - In ra họ tên và số tiền điện
 * 
 */

// Giải bài tập 2
function tinhTienDien(hoTen, soKw) {
    let tien = 0;

    if (soKw <= 50) {
        tien = soKw * 500;
    } else if (soKw <= 100) {
        tien = 50 * 500 + (soKw - 50) * 650;
    } else if (soKw <= 150) {
        tien = 50 * 500 + 50 * 650 + (soKw - 100) * 850;
    } else if (soKw <= 200) {
        tien = 50 * 500 + 50 * 650 + 50 * 850 + (soKw - 150) * 1100;
    } else {
        tien = 50 * 500 + 50 * 650 + 50 * 850 + 50 * 1100 + (soKw - 200) * 1300;
    }

    let tienFormatted = tien.toLocaleString("vi-VN");

    return `Họ tên: ${hoTen} - Tiền điện: ${tienFormatted}đ`;
}

document.getElementById("btnTinhTienDien").onclick = function () {
    let hoTen = document.getElementById("hoTen").value;
    let soKw = document.getElementById("soKw").value * 1;

    if (hoTen.trim() === "" || isNaN(soKw) || soKw < 0) {
        alert("Vui lòng nhập đầy đủ và đúng thông tin!");
        return;
    }

    let ketQua = tinhTienDien(hoTen, soKw);
    document.getElementById("infoKetQua2").innerHTML = ketQua;
};

/**
 * Bài tập 3: Tính thuế thu nhập cá nhân
 * 
 * Đầu vào :
 * - Họ tên
 * - Tổng thu nhập năm (thuNhapNam)
 * - Số người phụ thuộc (soNguoiPhuThuoc)
 * 
 * Xử lý :
 * 
 * - Tính thu nhập chịu thuế:
 *      thuNhapChiuThue = thuNhapNam - 4e6 - (soNguoiPhuThuoc * 1.6e6)
 * 
 * - Tính thuế phải trả theo bảng thuế suất:
 *      + Nếu thuNhapChiuThue <= 60e6 => thuế = 5%
 *      + Nếu <= 120e6                => thuế = 10%
 *      + Nếu <= 210e6                => thuế = 15%
 *      + Nếu <= 384e6                => thuế = 20%
 *      + Nếu <= 624e6                => thuế = 25%
 *      + Nếu <= 960e6                => thuế = 30%
 *      + Trên 960e6                  => thuế = 35%
 * 
 * - Tính số tiền thuế phải nộp:
 *      tienThue = thuNhapChiuThue * (thuế suất tương ứng)
 * 
 * Đầu ra :
 *  - In ra màn hình họ tên và số tiền thuế
 * 
 */

// Giải bài tập 3
function tinhThue() {
    let hoTenCN = document.getElementById("hoTenCN").value;
    let thuNhapNam = document.getElementById("thuNhapNam").value * 1;
    let soNguoiPhuThuoc = document.getElementById("soNguoiPhuThuoc").value * 1;

    let thuNhapChiuThue = thuNhapNam - 4e6 - soNguoiPhuThuoc * 1.6e6;

    let thue = 0;

    if (thuNhapChiuThue <= 0) {
        thue = 0;
    } else if (thuNhapChiuThue <= 60e6) {
        thue = thuNhapChiuThue * 0.05;
    } else if (thuNhapChiuThue <= 120e6) {
        thue = thuNhapChiuThue * 0.1;
    } else if (thuNhapChiuThue <= 210e6) {
        thue = thuNhapChiuThue * 0.15;
    } else if (thuNhapChiuThue <= 384e6) {
        thue = thuNhapChiuThue * 0.2;
    } else if (thuNhapChiuThue <= 624e6) {
        thue = thuNhapChiuThue * 0.25;
    } else if (thuNhapChiuThue <= 960e6) {
        thue = thuNhapChiuThue * 0.3;
    } else {
        thue = thuNhapChiuThue * 0.35;
    }

    let thueQuyDoi = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(thue);

    console.log(hoTenCN);

    document.getElementById("infoKetQua3").innerText = `Họ tên: ${hoTenCN} - Thuế phải nộp là: ${thueQuyDoi} VNĐ`;
}


/**
 * Bài tập 4 : Tính tiền cáp 
 * 
 * Đầu vào :
 * - Mã khách hàng
 * - Loại khách hàng (Nhà dân hoặc Doanh nghiệp)
 * - Số kênh cao cấp
 * - Số kết nối
 * 
 * Xử lý :
 * Nếu là Nhà dân:
 *  - Phí hóa đơn: 4.5$
 *  - Phí dịch vụ cơ bản: 20.5$
 *  - Thuê kênh cao cấp: 7.5$ / kênh
 * Nếu là Doanh nghiệp:
 *  - Phí hóa đơn: 15$
 *  - Phí dịch vụ cơ bản: 75$ cho 10 kết nối đầu
 *  - Nếu kết nối > 10 thì mỗi kết nối thêm tính 5$
 *  - Thuê kênh cao cấp: 50$ / kênh
 * 
 * Đầu ra :
 *      - In ra màn hình số mã khách hàng và tiền cáp
 * 
 */


// Giải bài tập 4
function hienKetNoi() {
    const loai = document.getElementById("loaiKhachHang").value;
    const ketNoi = document.getElementById("ketNoi");
    if (loai === "doanhNghiep") {
        ketNoi.style.display = "block";
    } else {
        ketNoi.style.display = "none";
    }
}

function tinhTienCap() {
    const maKH = document.getElementById("maKhachHang").value;
    const loai = document.getElementById("loaiKhachHang").value;
    const soKenh = document.getElementById("soKenhCaoCap").value * 1;
    let tongTien = 0;

    if (loai === "nhaDan") {
        tongTien = 4.5 + 20.5 + (soKenh * 7.5);
    } else {
        const soKetNoi = document.getElementById("soKetNoi").value * 1;
        let phiKetNoi = 75;
        if (soKetNoi > 10) {
            phiKetNoi += (soKetNoi - 10) * 5;
        }
        tongTien = 15 + phiKetNoi + (soKenh * 50);
    }

    document.getElementById("infoketQua4").innerText = `Mã KH: ${maKH} - Tổng tiền cáp: $${tongTien.toFixed(2)}`;
}
