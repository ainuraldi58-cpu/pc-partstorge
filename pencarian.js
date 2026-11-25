document.addEventListener("DOMContentLoaded", function () {

    const searchBoxes = document.querySelectorAll(".search-box");

    searchBoxes.forEach(function (box) {

        const input = box.querySelector("input");
        const button = box.querySelector("button");

        function jalankanPencarian() {

            const kata = input.value.trim();

            if (document.querySelector(".card-container")) {
                filterProduk(kata);
            } else {
                window.location.href =
                    "produk.html?cari=" + encodeURIComponent(kata);
            }
        }

        button.addEventListener("click", jalankanPencarian);

        input.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                event.preventDefault();
                jalankanPencarian();
            }

        });

    });


    const params = new URLSearchParams(window.location.search);
    const kataAwal = params.get("cari");

    if (kataAwal !== null) {

        const inputProduk =
            document.querySelector(".search-box input");

        if (inputProduk) {
            inputProduk.value = kataAwal;
        }

        filterProduk(kataAwal);
    }


    function filterProduk(kata) {

        const cards =
            document.querySelectorAll(".card-container .card");

        const teksCari = kata.toLowerCase();

        let jumlah = 0;

        cards.forEach(function (card) {

            const nama =
                card.querySelector("h3")?.textContent.toLowerCase() || "";

            const harga =
                card.querySelector("h4")?.textContent.toLowerCase() || "";

            const cocok =
                !teksCari ||
                nama.includes(teksCari) ||
                harga.includes(teksCari);

            card.style.display = cocok ? "" : "none";

            if (cocok) {
                jumlah++;
            }

        });


        let hasil =
            document.querySelector(".hasil-pencarian");

        if (!hasil) {

            hasil = document.createElement("p");

            hasil.className = "hasil-pencarian";

            const judul =
                document.querySelector(".produk h2");

            if (judul) {
                judul.insertAdjacentElement(
                    "afterend",
                    hasil
                );
            }
        }


        if (teksCari) {

            if (jumlah > 0) {

                hasil.textContent =
                    `Ditemukan ${jumlah} produk untuk "${kata}".`;

            } else {

                hasil.textContent =
                    `Produk "${kata}" tidak ditemukan.`;

            }

        } else {

            hasil.textContent = "";

        }

    }

});