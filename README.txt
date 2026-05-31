TIEA IPTV MEMBER SYSTEM แบบ B

ไฟล์:
- login.html = เข้าสู่ระบบ
- register.html = สมัครสมาชิก
- waiting.html = รอแอดมินอนุมัติ
- admin.html = เปิด/ปิด VIP
- member-check.js = ใส่ในหน้า tv/movie/sport เพื่อบังคับ VIP
- index.html = หน้าโฮมตัวอย่างหลังล็อกอิน
- firebase-config.js = ค่า Firebase

วิธีใส่เช็คสมาชิกในหน้า IPTV:
เพิ่มบรรทัดนี้ก่อน </body>
<script type="module" src="./member-check.js"></script>

หมายเหตุ:
ใน Firestore ต้องมี document ของแอดมินใน members โดย role="admin", vip=true, active=true
