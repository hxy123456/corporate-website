/* ============================================
   TechNova Enterprise — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // --- Navbar Scroll Behavior ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Hamburger Menu ---
  const hamburger = document.querySelector('.navbar__hamburger');
  const overlay = document.querySelector('.navbar__overlay');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');

  if (hamburger && overlay && mobileMenu) {
    const toggleMenu = () => {
      hamburger.classList.toggle('open');
      overlay.classList.toggle('visible');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
    overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) toggleMenu();
      });
    });
  }

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // --- Number Counter Animation ---
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const animateCounter = (el) => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 2000;
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // --- Filter Tabs ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      const parent = tab.closest('.filter-tabs');
      parent.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      // Filter items
      const grid = document.querySelector('#product-grid, #job-list');
      if (!grid) return;

      const items = grid.querySelectorAll('[data-category]');
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.opacity = '0';
          requestAnimationFrame(() => {
            item.style.transition = 'opacity 0.4s ease';
            item.style.opacity = '1';
          });
        } else {
          item.style.opacity = '0';
          setTimeout(() => { item.style.display = 'none'; }, 400);
        }
      });
    });
  });

  // --- News Filter (separate for news page) ---
  const newsFilterTabs = document.querySelectorAll('.filter-tabs .filter-tab');
  const newsList = document.getElementById('news-list');
  if (newsList) {
    newsFilterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;
        const newsCards = newsList.querySelectorAll('.news-card');
        newsCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Modal Functions ---
  window.openModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // Close modal on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(modal => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  });

  // --- News Detail ---
  const newsData = [
    {
      title: 'TechNova Cloud 3.0 正式发布：全新架构带来10倍性能提升',
      date: '2026年4月15日',
      category: '企业新闻',
      content: '全新微服务架构与智能调度引擎，为企业客户提供更高效、更稳定的云服务体验。TechNova Cloud 3.0在计算性能、存储效率、网络吞吐三大维度实现突破性提升，核心指标较上一版本提升10倍以上。\n\n主要更新包括：\n- 全新微服务架构，支持百万级并发\n- 智能调度引擎，资源利用率提升60%\n- 存储性能优化，IOPS提升8倍\n- 网络吞吐增强，延迟降低至毫秒级\n- 安全合规升级，新增SOC 2 Type II认证'
    },
    {
      title: 'TechNova 获评"2026年度最具创新力科技企业"称号',
      date: '2026年4月8日',
      category: '企业新闻',
      content: '在第十届中国科技创新大会上，TechNova凭借在AI与云计算领域的持续创新，荣获"年度最具创新力科技企业"称号。\n\n评审委员会认为，TechNova在过去一年中推出了多项行业领先的技术创新，包括TechNova AI平台的AutoML能力、Cloud 3.0的智能调度引擎，以及SmartIoT的数字孪生技术，这些创新正在深刻改变企业数字化转型的路径与效率。'
    },
    {
      title: '2026年企业数字化转型趋势报告：AI与云原生成为核心驱动力',
      date: '2026年3月28日',
      category: '行业资讯',
      content: 'TechNova研究院发布年度趋势报告，指出AI大模型与云原生架构将成为企业数字化转型的两大核心驱动力。\n\n报告核心发现：\n- 78%的企业已将AI纳入数字化转型战略\n- 云原生架构采用率同比增长45%\n- 边缘计算与AI的结合成为新趋势\n- 数据安全与合规需求持续升级\n- 低代码/无代码平台加速业务创新'
    },
    {
      title: 'TechNova 2026技术开放日：邀您共探AI与云原生前沿',
      date: '2026年3月20日',
      category: '活动公告',
      content: 'TechNova将于4月25日在北京举办年度技术开放日，邀请行业专家与客户共同探讨AI与云原生技术的最新进展与应用实践。\n\n活动亮点：\n- 10+技术主题演讲\n- 实战案例分享与Workshop\n- TechNova Cloud 3.0现场体验\n- AI平台新功能Demo\n- 技术专家一对一咨询\n\n报名方式：请访问活动官网或联系您的客户经理。'
    },
    {
      title: 'TechNova与华为云达成战略合作，共建混合云生态',
      date: '2026年3月10日',
      category: '企业新闻',
      content: 'TechNova科技集团与华为云签署战略合作协议，双方将在混合云架构、AI平台、数据智能等领域展开深度合作。\n\n合作内容包括：\n- TechNova Cloud与华为云深度集成\n- 联合推出混合云解决方案\n- AI平台模型共享与优化\n- 数据智能产品互联互通\n- 共建开发者生态与培训体系'
    },
    {
      title: '边缘计算市场规模预计2028年突破千亿，TechNova提前布局',
      date: '2026年2月25日',
      category: '行业资讯',
      content: '据IDC最新报告预测，全球边缘计算市场规模将在2028年突破千亿元。TechNova凭借SmartIoT平台已提前完成战略布局。\n\nSmartIoT平台的核心优势：\n- 支持100+协议，百万级设备接入\n- 边缘计算节点覆盖全国主要城市\n- AI推理能力下沉至边缘端\n- 数字孪生技术实现设备3D可视化\n- 预测维护准确率达92%'
    }
  ];

  window.openNewsDetail = (index) => {
    const news = newsData[index];
    if (!news) return;

    const contentDiv = document.getElementById('news-detail-content');
    contentDiv.innerHTML = `
      <div style="font-size:var(--fs-tiny); color:var(--color-text-muted); margin-bottom:var(--space-sm);">${news.date} · ${news.category}</div>
      <h2>${news.title}</h2>
      <div style="margin-top:var(--space-lg); color:var(--color-text-secondary); line-height:1.8; white-space:pre-line;">${news.content}</div>
      <div style="margin-top:var(--space-xl); padding-top:var(--space-md); border-top:1px solid var(--color-border);">
        <h3>相关新闻</h3>
        <div style="margin-top:var(--space-sm);">
          ${newsData.filter((_, i) => i !== index).slice(0, 3).map(n => `
            <div style="padding:var(--space-sm) 0; border-bottom:1px solid var(--color-border);">
              <div style="font-size:var(--fs-tiny); color:var(--color-text-muted);">${n.date}</div>
              <div style="font-size:var(--fs-small); color:var(--color-primary); font-weight:500;">${n.title}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    openModal('news-detail-modal');
  };

  // --- Search News ---
  window.searchNews = () => {
    const query = document.getElementById('news-search').value.toLowerCase();
    const newsCards = document.querySelectorAll('#news-list .news-card');

    newsCards.forEach(card => {
      const title = card.querySelector('.news-card__title').textContent.toLowerCase();
      const excerpt = card.querySelector('.news-card__excerpt').textContent.toLowerCase();
      const match = !query || title.includes(query) || excerpt.includes(query);
      card.style.display = match ? '' : 'none';
    });
  };

  // Search on Enter key
  const searchInput = document.getElementById('news-search');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') searchNews();
    });
  }

  // --- Toast Notification ---
  window.showToast = (message, type = 'success') => {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast toast--${type}`;

    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3000);
  };

  // --- Form Validation ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Name
      const name = document.getElementById('name');
      const nameError = document.getElementById('name-error');
      if (!name.value.trim()) {
        name.classList.add('error');
        nameError.classList.add('visible');
        valid = false;
      } else {
        name.classList.remove('error');
        nameError.classList.remove('visible');
      }

      // Phone
      const phone = document.getElementById('phone');
      const phoneError = document.getElementById('phone-error');
      const phoneRegex = /^1[3-9]\d{9}$|^0\d{2,3}-?\d{7,8}$/;
      if (!phoneRegex.test(phone.value.trim())) {
        phone.classList.add('error');
        phoneError.classList.add('visible');
        valid = false;
      } else {
        phone.classList.remove('error');
        phoneError.classList.remove('visible');
      }

      // Email (optional but validate if filled)
      const email = document.getElementById('email');
      const emailError = document.getElementById('email-error');
      if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.classList.add('error');
        emailError.classList.add('visible');
        valid = false;
      } else {
        email.classList.remove('error');
        emailError.classList.remove('visible');
      }

      // Need
      const need = document.getElementById('need');
      const needError = document.getElementById('need-error');
      if (!need.value.trim()) {
        need.classList.add('error');
        needError.classList.add('visible');
        valid = false;
      } else {
        need.classList.remove('error');
        needError.classList.remove('visible');
      }

      if (valid) {
        showToast('留言已提交成功，我们将尽快回复您！', 'success');
        contactForm.reset();
      } else {
        showToast('请检查表单中的错误信息', 'error');
      }
    });

    // Clear error on input
    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const errorEl = document.getElementById(input.id + '-error');
        if (errorEl) errorEl.classList.remove('visible');
      });
    });
  }

  // --- Apply Form Validation ---
  const applyForm = document.getElementById('apply-form');
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById('apply-name');
      const nameError = document.getElementById('apply-name-error');
      if (!name.value.trim()) {
        name.classList.add('error');
        nameError.classList.add('visible');
        valid = false;
      } else {
        name.classList.remove('error');
        nameError.classList.remove('visible');
      }

      const email = document.getElementById('apply-email');
      const emailError = document.getElementById('apply-email-error');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.classList.add('error');
        emailError.classList.add('visible');
        valid = false;
      } else {
        email.classList.remove('error');
        emailError.classList.remove('visible');
      }

      const phone = document.getElementById('apply-phone');
      const phoneError = document.getElementById('apply-phone-error');
      const phoneRegex = /^1[3-9]\d{9}$|^0\d{2,3}-?\d{7,8}$/;
      if (!phoneRegex.test(phone.value.trim())) {
        phone.classList.add('error');
        phoneError.classList.add('visible');
        valid = false;
      } else {
        phone.classList.remove('error');
        phoneError.classList.remove('visible');
      }

      if (valid) {
        showToast('申请已提交成功，我们将尽快联系您！', 'success');
        applyForm.reset();
        closeModal('apply-modal');
      } else {
        showToast('请检查表单中的错误信息', 'error');
      }
    });

    applyForm.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const errorEl = document.getElementById(input.id + '-error');
        if (errorEl) errorEl.classList.remove('visible');
      });
    });
  }

  // --- Pagination (demo) ---
  document.querySelectorAll('.pagination__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.pagination');
      parent.querySelectorAll('.pagination__btn').forEach(b => b.classList.remove('active'));
      if (!btn.textContent.includes('‹') && !btn.textContent.includes('›')) {
        btn.classList.add('active');
      }
      showToast('分页功能演示 — 实际项目中将对接后端API');
    });
  });

  // --- Particle Animation (Login Page) ---
  const particleCanvas = document.getElementById('particle-canvas');
  if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    let mouseX = -9999;
    let mouseY = -9999;
    const PARTICLE_COUNT = 80;
    const CONNECTION_DIST = 150;
    const MOUSE_DIST = 200;

    function resizeCanvas() {
      particleCanvas.width = window.innerWidth;
      particleCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    document.addEventListener('mouseleave', () => {
      mouseX = -9999;
      mouseY = -9999;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > particleCanvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > particleCanvas.height) this.vy *= -1;

        // Mouse interaction — gentle push
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST * 0.02;
          this.vx += dx * force;
          this.vy += dy * force;
        }

        // Speed limit
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 2) {
          this.vx = (this.vx / speed) * 2;
          this.vy = (this.vy / speed) * 2;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 168, 56, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(232, 168, 56, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse connection
        const dx = particles[i].x - mouseX;
        const dy = particles[i].y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          const opacity = (1 - dist / MOUSE_DIST) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(232, 168, 56, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawConnections();
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // --- Login Form Handler ---
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = loginForm.querySelector('.login-form__btn');
      const btnText = btn.querySelector('.login-form__btn-text');
      const btnLoading = btn.querySelector('.login-form__btn-loading');

      // Show loading state
      btnText.style.display = 'none';
      btnLoading.style.display = 'flex';
      btn.disabled = true;

      // Simulate login delay then redirect to homepage
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1200);
    });
  }

})();