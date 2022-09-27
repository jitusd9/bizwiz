import React from 'react'
import style from "../../styles/footer.module.css"

export default function Footer() {
	return (
		<div className={style["footer"]}>
			<div className={style["footer-content"]}>
				<div className={style["footer-brand"]}>
					<h3 className={style["brand"]}>BizWiz</h3>
					<p> Better when it's on one place</p>
				</div>
				<div className={style["footer-links"]}>
					<ul className={style["about-company"]}>
						<li>About Us</li>
						<li>Privacy Policy</li>
						<li>Terms and conditions</li>
						<li>Contact Us</li>
						<li>Report an issue</li>
					</ul>
					<ul className={style["social-links"]}>
						<li>API</li>
						<li>Blog</li>
						<li>Telegram</li>
						<li>Facebook</li>
					</ul>
				</div>
			</div>
				<hr />
				<p className="copyright">Copyright claim © 2021 | made with <span>☕</span>  and <span>❤</span> by <a href='https://jitusd9.github.io' target="_blank" rel="noreferrer">Jitendra</a></p>
		</div>
	)
}
