// ========================================
// SISTEM KERANJANG PC PART STORE
// ========================================

const NAMA_KERANJANG = "pcPartStoreKeranjang";


// ================================
// AMBIL DATA KERANJANG
// ================================

function ambilKeranjang() {
    return JSON.parse(
        localStorage.getItem(NAMA_KERANJANG)
    ) || [];
}


// ================================
// SIMPAN DATA KERANJANG
// ================================

function simpanKeranjang(data) {
    localStorage.setItem(
        NAMA_KERANJANG,
        JSON.stringify(data)
    );
}


// ================================
// FORMAT HARGA
// ================================

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}


// ================================
// UBAH HARGA MENJADI ANGKA
// ================================

function ambilHarga(teks) {
    return Number(
        teks.replace(/[^\d]/g, "")
    ) || 0;
}


// ================================
// TAMBAH PRODUK
// ================================

function tambahKeKeranjang(produk) {

    const keranjang = ambilKeranjang();

    const produkLama = keranjang.find(
        item => item.nama === produk.nama
    );

    if (produkLama) {

        produkLama.jumlah += 1;

    } else {

        keranjang.push({
            nama: produk.nama,
            harga: produk.harga,
            gambar: produk.gambar,
            jumlah: 1
        });

    }

    simpanKeranjang(keranjang);

    alert(
        produk.nama + " berhasil ditambahkan ke keranjang!"
    );
}


// ================================
// SAAT HTML SELESAI DIMUAT
// ================================

document.addEventListener("DOMContentLoaded", function () {


    // ====================================
    // TOMBOL TAMBAH KE KERANJANG
    // ====================================

    document.querySelectorAll(".btn-keranjang")
        .forEach(function (tombol) {

        tombol.addEventListener("click", function () {

            const card = tombol.closest(".card");

            if (!card) return;


            const nama =
                card.querySelector("h3")
                .textContent
                .trim();


            const hargaText =
                card.querySelector("h4")
                .textContent
                .trim();


            const gambar =
                card.querySelector("img")
                .getAttribute("src");


            tambahKeKeranjang({

                nama: nama,

                harga: ambilHarga(hargaText),

                gambar: gambar

            });


            tombol.innerHTML =
                "✓ Sudah Ditambahkan";


            setTimeout(function () {

                tombol.innerHTML =
                    '<i class="fas fa-cart-plus"></i> Tambah ke Keranjang';

            }, 1000);

        });

    });


    // ====================================
    // TOMBOL BELI LANGSUNG WHATSAPP
    // ====================================

    document.querySelectorAll(".btn-beli-wa")
        .forEach(function (tombol) {

        tombol.addEventListener("click", function () {

            const card = tombol.closest(".card");

            const nama =
                card.querySelector("h3")
                .textContent
                .trim();


            const harga =
                card.querySelector("h4")
                .textContent
                .trim();


            const nomorWA =
                "6283851144761";


            const pesan =
                "Halo PC Part Store,%0A%0A" +
                "Saya ingin membeli:%0A" +
                "Produk: " + nama + "%0A" +
                "Harga: " + harga + "%0A%0A" +
                "Apakah produk masih tersedia?";


            const url =
                "https://wa.me/" +
                nomorWA +
                "?text=" +
                pesan;


            window.open(url, "_blank");

        });

    });


    // ====================================
    // TAMPILKAN KERANJANG
    // ====================================

    if (document.querySelector(".cart-box")) {

        tampilkanKeranjang();

    }

});


// ========================================
// MENAMPILKAN ISI KERANJANG
// ========================================

function tampilkanKeranjang() {

    const box =
        document.querySelector(".cart-box");

    if (!box) return;


    const keranjang =
        ambilKeranjang();


    box.innerHTML = "";


    // ====================================
    // JIKA KOSONG
    // ====================================

    if (keranjang.length === 0) {

        box.innerHTML = `

            <div class="keranjang-kosong">

                <i class="fas fa-shopping-cart"></i>

                <h2>Keranjang masih kosong</h2>

                <p>
                    Silakan pilih produk terlebih dahulu.
                </p>

                <a
                    href="produk.html"
                    class="checkout">

                    Lihat Produk

                </a>

            </div>

        `;

        return;
    }


    let total = 0;


    // ====================================
    // TAMPILKAN PRODUK
    // ====================================

    keranjang.forEach(function (item, index) {

        const subtotal =
            item.harga * item.jumlah;


        total += subtotal;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.gambar}"
                alt="${item.nama}"
            >


            <div class="item-info">

                <h3>
                    ${item.nama}
                </h3>


                <p>
                    Harga :
                    <b>
                        ${formatRupiah(item.harga)}
                    </b>
                </p>


                <div class="jumlah-produk">

                    <span>Jumlah :</span>


                    <button
                        class="kurang"
                        data-index="${index}">

                        −

                    </button>


                    <b>
                        ${item.jumlah}
                    </b>


                    <button
                        class="tambah"
                        data-index="${index}">

                        +

                    </button>

                </div>


                <p>
                    Subtotal :
                    <b>
                        ${formatRupiah(subtotal)}
                    </b>
                </p>

            </div>


            <button
                class="hapus"
                data-index="${index}">

                Hapus

            </button>

        `;


        box.appendChild(cartItem);

    });


    // ====================================
    // TOTAL
    // ====================================

    const totalBox =
        document.createElement("div");


    totalBox.className =
        "total";


    totalBox.innerHTML = `

        <h2>

            Total :

            <span>
                ${formatRupiah(total)}
            </span>

        </h2>


        <button
            class="checkout"
            id="checkoutButton">

            Checkout

        </button>

    `;


    box.appendChild(totalBox);


    // ====================================
    // TOMBOL HAPUS
    // ====================================

    document.querySelectorAll(".hapus")
        .forEach(function (button) {

        button.addEventListener("click", function () {

            const index =
                Number(button.dataset.index);


            const data =
                ambilKeranjang();


            data.splice(index, 1);


            simpanKeranjang(data);


            tampilkanKeranjang();

        });

    });


    // ====================================
    // TOMBOL KURANG
    // ====================================

    document.querySelectorAll(".kurang")
        .forEach(function (button) {

        button.addEventListener("click", function () {

            const index =
                Number(button.dataset.index);


            const data =
                ambilKeranjang();


            if (data[index].jumlah > 1) {

                data[index].jumlah--;

            } else {

                data.splice(index, 1);

            }


            simpanKeranjang(data);


            tampilkanKeranjang();

        });

    });


    // ====================================
    // TOMBOL TAMBAH
    // ====================================

    document.querySelectorAll(".tambah")
        .forEach(function (button) {

        button.addEventListener("click", function () {

            const index =
                Number(button.dataset.index);


            const data =
                ambilKeranjang();


            data[index].jumlah++;


            simpanKeranjang(data);


            tampilkanKeranjang();

        });

    });


    // ====================================
    // CHECKOUT
    // ====================================

    const checkout =
        document.getElementById(
            "checkoutButton"
        );


    if (checkout) {

        checkout.addEventListener(
            "click",
            function () {

                alert(
                    "Checkout berhasil diproses!"
                );

            }
        );

    }

}