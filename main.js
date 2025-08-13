document.addEventListener(
	'DOMContentLoaded',
	function() {
		fetch(
				'hisnmuslim.json') // استدعاء ملف JSON
			.then(response => response
				.json())
			.then(data => {
				const tableTbody = document
					.getElementById(
						'table_tbody');
				const categoryContent =
					document.getElementById(
						'category_content');
				const titleIndex = document
					.getElementById(
						'title_index');
				const alrt = document
					.getElementById('alrt');
				const Search = document
					.getElementById('Search');
				
				// عرض الفئات في الجدول  
				data.forEach(item => {
					const tr = document
						.createElement(
							'tr');
					tr.innerHTML = `  
                <td class="number_index">${item.id}</td>  
                <td><p class="category" id="category_id_${item.id}">${item.category}</p></td>  
                <td><button class="audio" id="bt_id_${item.id}">تشغيل</button></td>  
            `;
					tableTbody
						.appendChild(tr);
				});
				
				// تشغيل الصوت  
				document.querySelectorAll(
					'.audio').forEach(
					button => {
						const id = button.id
							.split('bt_id_')[1];
						const sound =
							new Audio(data[id -
								1].audio);
						button.onclick =
							() => {
								if (sound
									.paused) {
									sound.play();
									button
										.innerText =
										'إيقاف';
								} else {
									sound.pause();
									sound
										.currentTime =
										0;
									button
										.innerText =
										'تشغيل';
								}
							};
					});
				
				// عرض محتوى الفئة  
				document.querySelectorAll(
					'.category').forEach(
					category => {
						category.onclick =
							() => {
								const id =
									category.id
									.split(
										'category_id_'
									)[1];
								const
									categoryData =
									data[id - 1];
								titleIndex
									.innerText =
									categoryData
									.category;
								categoryContent
									.innerHTML = `  
                    <h2>${categoryData.category}</h2>  
                    ${categoryData.array.map(item => `  
                        <div class="category_content_li animate__animated animate__fadeIn">  
                            <div class="category_top">  
                                <p class="category_text">${item.text}</p>  
                                <audio class="category_audio" src="${item.audio}" controls></audio>  
                            </div>  
                            <ul class="category_bottom">  
                            <li class="count" onclick="decreaseCount(this)">  
التكرار: <span class="category_bottom_number">${item.count}</span>

</li>  
                                    <li class="copy">نسخ</li>  
                                </ul>  
                            </div>  
                        `).join('')}  
                        <button id="back">رجوع</button>  
                    `;
								document
									.getElementById(
										'table').style
									.display =
									'none';
								Search.style
									.display =
									'none';
								categoryContent
									.style.display =
									'block'; // زر الرجوع  
								document
									.getElementById(
										'back')
									.onclick =
									() => {
										window
											.location
											.reload();
									};
								
								// نسخ النص  
								document
									.querySelectorAll(
										'.copy')
									.forEach(
										copyButton => {
											copyButton
												.onclick =
												() => {
													const
														text =
														copyButton
														.parentElement
														.parentElement
														.querySelector(
															'.category_text'
														)
														.innerText;
													navigator
														.clipboard
														.writeText(
															text
														);
													alrt
														.style
														.display =
														'block';
													setTimeout
														(() =>
															alrt
															.style
															.display =
															'none',
															1000
														);
												};
										});
							};
					});
				
				// البحث  
				Search.onkeyup = () => {
					const filter = Search
						.value.toUpperCase();
					document
						.querySelectorAll(
							'.category')
						.forEach(category => {
							const txtValue =
								category
								.textContent ||
								category
								.innerText;
							category
								.parentElement
								.parentElement
								.style.display =
								txtValue
								.toUpperCase()
								.includes(
									filter) ? '' :
								'none';
						});
				};
			})
			.catch(error => console.error(
				'حدث خطأ أثناء تحميل البيانات:',
				error));
		
	});

function toggleInfo() {
	const info = document.getElementById('info');
	if (info.style.display === 'none' || info.style.display === '') {
		info.style.display = 'block'; // عرض العنصر
	} else {
		info.style.display = 'none'; // إخفاء العنصر
	}
	// دالة إخفاء info عند الضغط على زر الإخفاء
	document.getElementById('hideButton').addEventListener('click', function() {
		const info = document.getElementById('info');
		info.style.display = 'none'; // إخفاء العنصر
	});
}
document.getElementById('searchToggle').addEventListener('click', function() {
	const container = document.querySelector('.search-container');
	container.classList.toggle('active');
	
	if (container.classList.contains('active')) {
		document.getElementById('Search').focus();
	} else {
		document.getElementById('Search').value = '';
	}
});
// دالة إنقاص العدد عند النقر
function decreaseCount(element) {
	let countSpan = element.querySelector(".category_bottom_number");
	let count = parseInt(countSpan.textContent);
	
	if (count === 1) {
		showCompletionMessage(); // عرض الرسالة قبل أن يصبح العدد 0
	}
	
	if (count > 0) {
		count--; // إنقاص العدد
		countSpan.textContent = count; // تحديث العرض
	}
}

// دالة عرض رسالة "تم إكمال الذكر"
function showCompletionMessage() {
	const alrt1 = document.getElementById('alrt1'); // نفس العنصر المستخدم في النسخ
	alrt1.innerText = "تم إكمال الذكر"; // تغيير النص
	alrt1.style.display = 'block'; // إظهار الرسالة
	
	setTimeout(() => {
		alrt1.style.display = 'none'; // إخفاء الرسالة بعد ثانية
	}, 1000);
}
function toggleSettingsMenu() {
	const settingsMenu = document.getElementById('settingsMenu');
	if (settingsMenu.style.display === 'none' || settingsMenu.style.display === '') {
		settingsMenu.style.display = 'block';
	} else {
		settingsMenu.style.display = 'none';
	}
}
document.getElementById("fontSizeSelector").addEventListener("change", function() {
	const fontSize = this.value;
	document.body.style.fontSize = fontSize;
});
const themes = {
 light: {
  "--bg-light": "#ffffff",
  "--bg-medium": "#f5f5f5",
  "--bg-dark": "#e0e0e0",
  "--text-dark": "#333333",
  "--text-light": "#ffffff",
  "--text-accent": "#007BFF",
  "--button-primary": "#007BFF",
  "--button-secondary": "#d1e3ff",
  "--button-hover": "#0056b3",
  "--border-light": "#dddddd",
  "--border-medium": "#cccccc",
  "--bg-color-head-foter": "#f2f2f2",
  "--header-text-color": "#000000",
  "--contrast-light": "#f9f9f9",
  "--pink": "#ffb6c1",
  "--brown-medium-light": "#8b5e3c",
  "--audio-bg-color": "#eeeeee",
  "--audio-border-color": "#cccccc",
  "--audio-controls-bg": "#dddddd"
 },
 dark: {
  "--bg-light": "#1e1e1e",
  "--bg-medium": "#2a2a2a",
  "--bg-dark": "#121212",
  "--text-dark": "#e0e0e0",
  "--text-light": "#ffffff",
  "--text-accent": "#4fc3f7",
  "--button-primary": "#3f51b5",
  "--button-secondary": "#616161",
  "--button-hover": "#5c6bc0",
  "--border-light": "#333333",
  "--border-medium": "#444444",
  "--bg-color-head-foter": "#252525",
  "--header-text-color": "#ffffff",
  "--contrast-light": "#333333",
  "--pink": "#f06292",
  "--brown-medium-light": "#a1887f",
  "--audio-bg-color": "#2e2e2e",
  "--audio-border-color": "#444444",
  "--audio-controls-bg": "#3a3a3a"
 },
 brown: {
  "--bg-light": "#f3ede7",
  "--bg-medium": "#e0d6cc",
  "--bg-dark": "#c8b6a6",
  "--text-dark": "#4b3b2b",
  "--text-light": "#fffaf5",
  "--text-accent": "#a9745a",
  "--button-primary": "#a9745a",
  "--button-secondary": "#e6d3c2",
  "--button-hover": "#8e5a45",
  "--border-light": "#d6c2b2",
  "--border-medium": "#bfa293",
  "--bg-color-head-foter": "#d8c4b3",
  "--header-text-color": "#3b2b20",
  "--contrast-light": "#f5eee7",
  "--pink": "#d39b87",
  "--brown-medium-light": "#a9745a",
  "--audio-bg-color": "#e8ddd3",
  "--audio-border-color": "#c4b2a3",
  "--audio-controls-bg": "#d2c0b1"
 },
 blue: {
  "--bg-light": "#e6f4ff",
  "--bg-medium": "#cce4f6",
  "--bg-dark": "#b3d4ef",
  "--text-dark": "#002b45",
  "--text-light": "#f0faff",
  "--text-accent": "#007acc",
  "--button-primary": "#007acc",
  "--button-secondary": "#cce4f6",
  "--button-hover": "#005f99",
  "--border-light": "#b3d4ef",
  "--border-medium": "#99c4e6",
  "--bg-color-head-foter": "#d0e8f8",
  "--header-text-color": "#002b45",
  "--contrast-light": "#f0faff",
  "--pink": "#90caf9",
  "--brown-medium-light": "#1565c0",
  "--audio-bg-color": "#e0f0fc",
  "--audio-border-color": "#a3cdee",
  "--audio-controls-bg": "#bce0fa"
 },
 green: {
  "--bg-light": "#e8f5e9",
  "--bg-medium": "#c8e6c9",
  "--bg-dark": "#a5d6a7",
  "--text-dark": "#1b5e20",
  "--text-light": "#e8f5e9",
  "--text-accent": "#43a047",
  "--button-primary": "#43a047",
  "--button-secondary": "#c5e1a5",
  "--button-hover": "#2e7d32",
  "--border-light": "#a5d6a7",
  "--border-medium": "#81c784",
  "--bg-color-head-foter": "#dcedc8",
  "--header-text-color": "#1b5e20",
  "--contrast-light": "#f1f8e9",
  "--pink": "#a5d6a7",
  "--brown-medium-light": "#558b2f",
  "--audio-bg-color": "#d0f0d0",
  "--audio-border-color": "#a2d9a2",
  "--audio-controls-bg": "#b2e0b2"
 },
 gold: {
  "--bg-light": "#fff8e1",
  "--bg-medium": "#ffecb3",
  "--bg-dark": "#ffe082",
  "--text-dark": "#5d4037",
  "--text-light": "#fff8e1",
  "--text-accent": "#ffc107",
  "--button-primary": "#ffc107",
  "--button-secondary": "#ffecb3",
  "--button-hover": "#ffb300",
  "--border-light": "#ffe082",
  "--border-medium": "#ffd54f",
  "--bg-color-head-foter": "#ffeaa7",
  "--header-text-color": "#5d4037",
  "--contrast-light": "#fff3e0",
  "--pink": "#ffcc80",
  "--brown-medium-light": "#ffa000",
  "--audio-bg-color": "#fff3cd",
  "--audio-border-color": "#ffe59a",
  "--audio-controls-bg": "#ffe082"
 },
 turquoise: {
  "--bg-light": "#e0f7fa",
  "--bg-medium": "#b2ebf2",
  "--bg-dark": "#80deea",
  "--text-dark": "#004d40",
  "--text-light": "#e0f7fa",
  "--text-accent": "#26c6da",
  "--button-primary": "#26c6da",
  "--button-secondary": "#b2ebf2",
  "--button-hover": "#00acc1",
  "--border-light": "#80deea",
  "--border-medium": "#4dd0e1",
  "--bg-color-head-foter": "#b2ebf2",
  "--header-text-color": "#004d40",
  "--contrast-light": "#e0f2f1",
  "--pink": "#4dd0e1",
  "--brown-medium-light": "#0097a7",
  "--audio-bg-color": "#ccf4f7",
  "--audio-border-color": "#99e0e6",
  "--audio-controls-bg": "#b2f2f7"
 }
};
document.getElementById("themeSelector").addEventListener("change", function() {
	const theme = this.value;
	const root = document.documentElement;
	
	// تطبيق القيم الجديدة
	const selectedTheme = themes[theme];
	if (selectedTheme) {
		for (const variable in selectedTheme) {
			root.style.setProperty(variable, selectedTheme[variable]);
		}
		
		// إظهار تنبيه بتغيير السمة
		showAlert(`تم تغيير السمة إلى ${theme} بنجاح`);
	}
});

function showAlert(message) {
	const alert = document.createElement('div');
	alert.className = 'theme-alert';
	alert.textContent = message;
	alert.style.position = 'fixed';
	alert.style.bottom = '20px';
	alert.style.right = '20px';
	alert.style.backgroundColor = 'var(--button-primary)';
	alert.style.color = 'var(--text-dark)';
	alert.style.padding = '10px 20px';
	alert.style.borderRadius = '5px';
	alert.style.boxShadow = 'var(--shadow-medium)';
	alert.style.zIndex = '1000';
	alert.style.animation = 'fadeIn 0.3s ease';
	
	document.body.appendChild(alert);
	
	setTimeout(() => {
		alert.style.animation = 'fadeOut 0.3s ease';
		setTimeout(() => {
			document.body.removeChild(alert);
		}, 300);
	}, 2000);
}
// إضافة أنيميشن للتنبيه
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(10px); }
    }
`;
document.head.appendChild(style);
// دالة فتح/إغلاق القائمة الجانبية
function toggleSidebar() {
 const sidebar = document.getElementById('sidebar');
 sidebar.classList.toggle('active');
 
 // إخفاء زر التبديل عند فتح القائمة
 const sidebarToggle = document.querySelector('.sidebar-toggle');
 if (sidebar.classList.contains('active')) {
  sidebarToggle.style.display = 'none';
 } else {
  sidebarToggle.style.display = 'flex';
 }
}

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', function(event) {
 const sidebar = document.getElementById('sidebar');
 const sidebarToggle = document.querySelector('.sidebar-toggle');
 
 if (!sidebar.contains(event.target) &&
  event.target !== sidebarToggle &&
  !sidebarToggle.contains(event.target)) {
  sidebar.classList.remove('active');
  sidebarToggle.style.display = 'flex';
 }
});