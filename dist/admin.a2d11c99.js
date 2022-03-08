parcelRequire = function (e, r, t, n) { var i, o = "function" == typeof parcelRequire && parcelRequire, u = "function" == typeof require && require; function f(t, n) { if (!r[t]) { if (!e[t]) { var i = "function" == typeof parcelRequire && parcelRequire; if (!n && i) return i(t, !0); if (o) return o(t, !0); if (u && "string" == typeof t) return u(t); var c = new Error("Cannot find module '" + t + "'"); throw c.code = "MODULE_NOT_FOUND", c } p.resolve = function (r) { return e[t][1][r] || r }, p.cache = {}; var l = r[t] = new f.Module(t); e[t][0].call(l.exports, p, l, l.exports, this) } return r[t].exports; function p(e) { return f(p.resolve(e)) } } f.isParcelRequire = !0, f.Module = function (e) { this.id = e, this.bundle = f, this.exports = {} }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) { e[r] = [function (e, r) { r.exports = t }, {}] }; for (var c = 0; c < t.length; c++)try { f(t[c]) } catch (e) { i || (i = e) } if (t.length) { var l = f(t[t.length - 1]); "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () { return l }) : n && (this[n] = l) } if (parcelRequire = f, i) throw i; return f }({
    "V6IH": [function (require, module, exports) {
        const e = "https://zestx.centralindia.cloudapp.azure.com"; let t, n, s, a, i, r, l, o, d, c = localStorage.getItem("jwt"), u = document.getElementById("container_common_background"), m = document.getElementsByClassName("primary_event_list_admin_page"), _ = document.getElementById("admin_main_page_container"), g = document.getElementById("admin_preloader_container"), y = document.getElementById("admin_add_user_page_container"), h = document.getElementById("internal_user_list"), p = document.getElementById("internal_users_list_loader"), f = document.getElementById("external_user_list"), v = document.getElementById("external_users_list_loader"), E = document.getElementById("secondh2"), I = document.getElementById("event_description_datails_sub_container"), L = 1, B = 1, b = 0, T = Date.now(), w = !0; async function C() { try { const u = await fetch(`${e}/admin/ongoingevents`, { method: "GET" }); if (500 == u.status) O(0, "Internal server error please re-try!"); else { const e = await u.json(); d = e.data, o = d[0].fest_id, $(d), k(d[0]), N(d[0].user_id), M(d[0].external_user_id), D(m[b].getElementsByClassName("festival_list_overlay")[0]); let t = m.length; for (let n = 0; n < t; n++) { let e = m[n]; e.addEventListener("click", () => { D(p), D(v), L++, B++, b != n && (z(m[b].getElementsByClassName("festival_list_overlay")[0]), D(e.getElementsByClassName("festival_list_overlay")[0]), b = n), o = e.id, e.classList.add("active_event"), z(h), z(f); const t = d.find(t => t.fest_id == e.id); k(t), N(t.user_id), M(t.external_user_id) }) } } n = document.getElementById("back_btn_from_add_user_page"), (s = document.getElementById("Add_user_button")).addEventListener("click", async () => { if (a = document.getElementById("name").value, r = document.getElementById("email").value, (l = document.getElementById("phone_number").value) && 10 != l.length) return O(2, "Mobile no. should be of 10 length!"); if (r && !F(r)) return O(2, "Please Enter a valid email!"); if (0 == a.length) return O(2, "Please fill name!"); if (!a || !r && !l) return O(2, "Please fill atleast one of email and phone number!"); H(); const t = await fetch(`${e}/admin/adduser`, { method: "POST", headers: { "Content-Type": "application/json", authorization: c }, body: JSON.stringify({ event_id: o, username: a, email: r, mobile: l }) }); if (400 == t.status) return O(2, "You have not access to admin panel!"), void P(); if (500 == t.status) return O(0, "Internal server error please re-try!"), void P(); const n = await fetch(`${e}/admin/ongoingevents`, { method: "GET" }); if (500 == n.status) return O(0, "Internal server error please re-try!"); const s = await n.json(), i = (d = s.data).find(e => e.fest_id == o); L++, M(i.external_user_id), O(1, "User added successfully!"), setTimeout(function () { j() }, 2500) }), n.addEventListener("click", () => { j() }), E.addEventListener("click", () => { document.getElementById("name").value = null, document.getElementById("email").value = null, document.getElementById("phone_number").value = null, P() }), (t = document.getElementById("logout_button_admin_main_page")).addEventListener("click", () => { localStorage.removeItem("jwt"), location.href = "/" }) } catch (i) { O(0, "Internal server error please re-try!"), console.log(i) } } function $(e) { u.innerHTML = ""; let t = e.length; e.forEach(function (e, n) { const { fest_id: s, fest_name: a, start_date: i, end_date: r } = e; var l = new Date(parseInt(i)), o = new Date(parseInt(r)); let d = l.getDate() + "-" + (l.getMonth() + 1) + "-" + l.getFullYear(), c = o.getDate() + "-" + (o.getMonth() + 1) + "-" + o.getFullYear(); const _ = document.createElement("div"); _.classList.add("inner_list"), _.classList.add("primary_event_list_admin_page"), _.id = `${s}`; const g = `<h3 class="innerList_h3">${a}</h3>\n    <h4 class="innerList_h4">${d} - ${c}</h4>\n    <div class="festival_list_overlay"></div>\n    `; _.innerHTML = g, u.appendChild(_), n == t - 1 && (m[n].style.borderBottom = "none") }) } function k(e) { let t = document.getElementById("RulesContentinnerList"), n = document.getElementById("DescriptionContentinnerList"), s = document.getElementById("PrizesContentinnerList"), a = document.getElementById("VenueContentinnerList"); t.innerHTML = `${e.rules}`, n.innerHTML = `${e.description}`, s.innerHTML = `${e.prize}`, a.innerHTML = `${e.venue}` } async function N(t) { try { if (null != t && 0 != t.length) { const n = await fetch(`${e}/admin/userdetails`, { method: "POST", headers: { "Content-Type": "application/json", authorization: c }, body: JSON.stringify({ ids: t.toString() }) }); if (400 == n.status) return O(2, "You have not access to admin panel!"); if (500 == n.status) return O(0, "Internal server error please re-try!"); x((await n.json()).data, t), 0 == --B && (z(p), D(h)) } else h.innerHTML = "", 0 == --B && (z(p), D(h)) } catch (n) { B--, O(0, "Internal server error please re-try!"), console.log(n) } } async function M(t) { try { if (null != t && 0 != t.length) { const n = await fetch(`${e}/admin/exuserdetails`, { method: "POST", headers: { "Content-Type": "application/json", authorization: c }, body: JSON.stringify({ ids: t.toString() }) }); if (400 == n.status) return O(2, "You have not access to admin panel!"); if (500 == n.status) return O(0, "Internal server error please re-try!"); S((await n.json()).data, t), L--, w ? (setTimeout(function () { j() }, 100), w = !1) : 0 == L && (z(v), D(f)) } else f.innerHTML = "", L--, w ? (setTimeout(function () { j() }, 100), w = !1) : 0 == L && (z(v), D(f)) } catch (n) { L--, O(0, "Internal server error please re-try!"), console.log(n) } } function x(t, n) { h.innerHTML = ""; let s = t.length; for (let e of t) if (null != e) { const { user_name: t, email: n, mobile: s } = e, a = document.createElement("div"); a.classList.add("inner_list_content"), a.classList.add("registered_internal_user"); const i = `<div class="inner_list">\n    <div class="inner_list_content internal_user_list_element">\n        <h3 class="innerList_h3" id="user_name">${t}</h3>\n        <h4 class="innerList_h4" id="user_details">${n} || ${s}</h4>\n    </div>\n    <img class="internal_user_delete_button" src="./assets/delete_user_btn.svg" alt="">\n</div>\n    `; a.innerHTML = i, h.appendChild(a) } else s--; document.getElementsByClassName("registered_internal_user")[s - 1].getElementsByClassName("inner_list")[0].style.borderBottom = "none"; let a = document.getElementsByClassName("registered_internal_user"), i = document.getElementsByClassName("internal_user_delete_button"), r = i.length; for (let l = 0; l < r; l++)i[l].addEventListener("click", async () => { H(); try { const s = await fetch(`${e}/admin/removeuser`, { method: "POST", headers: { "Content-Type": "application/json", authorization: c }, body: JSON.stringify({ eventId: o, userId: n[l] }) }); if (400 == s.status) return O(2, "You have not access to admin panel!"), void j(); if (500 == s.status) return O(0, "Internal server error please re-try!"), void j(); a[l].style.display = "none", l > -1 && n.splice(l, 1), O(1, "User removed successfully!"), j() } catch (t) { O(0, "Internal server error please re-try!"), console.log(t) } }) } function S(t, n) { f.innerHTML = ""; for (let e of t) { const { username: t, email: n, mobile: s } = e, a = document.createElement("div"); let i; a.classList.add("inner_list_content"), a.classList.add("registered_external_user"), i = n && s ? `<div class="inner_list">\n        <div class="inner_list_content external_user_list_element">\n            <h3 class="innerList_h3" id="user_name">${t}</h3>\n            <h4 class="innerList_h4" id="user_details">${n} || ${s}</h4>\n        </div>\n        <img class="external_user_delete_button" src="./assets/delete_user_btn.svg" alt="">\n    </div>\n        ` : `<div class="inner_list">\n        <div class="inner_list_content">\n            <h3 class="innerList_h3" id="user_name">${t}</h3>\n            <h4 class="innerList_h4" id="user_details">${n} ${s}</h4>\n        </div>\n        <img class="external_user_delete_button" src="./assets/delete_user_btn.svg" alt="">\n    </div>\n        `, a.innerHTML = i, f.appendChild(a) } document.getElementsByClassName("registered_external_user")[t.length - 1].getElementsByClassName("inner_list")[0].style.borderBottom = "none"; let s = document.getElementsByClassName("registered_external_user"), a = document.getElementsByClassName("external_user_delete_button"), i = a.length; for (let r = 0; r < i; r++)a[r].addEventListener("click", async () => { H(); try { const a = await fetch(`${e}/admin/removeexuser`, { method: "POST", headers: { "Content-Type": "application/json", authorization: c }, body: JSON.stringify({ eventId: o, userId: n[r] }) }); if (400 == a.status) return O(2, "You have not access to admin panel!"), void j(); if (500 == a.status) return O(0, "Internal server error please re-try!"), void j(); s[r].style.display = "none", r > -1 && n.splice(r, 1), O(1, "User removed successfully!"), j() } catch (t) { O(0, "Internal server error please re-try!"), console.log(t) } }) } function j() { z(g), D(_), z(y) } function H() { D(g), z(_), z(y) } function P() { D(y), z(_), z(g) } function z(e) { e.classList.contains("display_to_block") && e.classList.remove("display_to_block"), e.classList.add("display_to_none"), "none" != e.style.display && (e.classList.add("display_to_none"), setTimeout(function () { e.style.display = "none", e.style.opacity = 0 }, 200)) } function D(e) { e.style.display = "block", e.style.opacity = 1, e.classList.contains("display_to_none") && e.classList.remove("display_to_none"), e.classList.add("display_to_block") } function O(e, t) { if (Date.now() - T > 5e3) { let n = document.getElementById("toastAlertMessage"), s = document.getElementById("toastImage"), a = document.getElementById("toastFrontMessage"), i = document.getElementById("toastDescriptionMessage"), r = t.length + 7; document.getElementById("toastAlertMessage").style.setProperty("--foo", `${r}ch`), 1 == e ? (s.src = "./assets/success_tick.svg", a.style.backgroundColor = "green") : 0 == e ? (s.src = "./assets/error_cross.svg", a.style.backgroundColor = "red") : (s.src = "./assets/neutral_exclamation.svg", a.style.backgroundColor = "black"), i.innerText = " ", setTimeout(function () { i.innerText = t }, 600), setTimeout(function () { i.innerText = " " }, 4200), n.className = "toastPopUp", setTimeout(function () { n.className = n.className.replace("toastPopUp", "") }, 5e3), T = Date.now() } else setTimeout(function () { O(e, t) }, 5500 - (Date.now() - T)) } window.addEventListener("load", () => { setTimeout(() => { Y(1, C) }, 200) }); var Y = function (e, t) { const n = localStorage.getItem("jwt"); n && null != n ? fetch("https://zestx.centralindia.cloudapp.azure.com/user/getdetails", { method: "GET", headers: { authorization: n } }).then(e => e.json()).then(n => { let s = n.data.is_admin; switch (e) { case 0: A(s); break; case 1: J(s, t); break; case 2: U(s, t) } }).catch(e => { console.log(e) }) : e > 0 ? window.location.href = "./signupsignin.html#signin" : t() }; function A(e) { window.location.href = e ? "./admin.html" : "./homepage.html" } function J(e, t) { e ? t() : window.location.href = "./homepage.html" } function U(e, t) { e ? window.location.href = "./admin.html" : t() } function F(e) { return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e) } setTimeout(function () { bodymovin.loadAnimation({ container: document.getElementById("admin_add_user_anim_container"), renderer: "svg", loop: !0, autoplay: !0, path: "./anim/admin_add_user_page_anim/high_res/admin_add_user_page_anim.json" }) }, 200);
    }, {}]
}, {}, ["V6IH"], null)
//# sourceMappingURL=/admin.a2d11c99.js.map