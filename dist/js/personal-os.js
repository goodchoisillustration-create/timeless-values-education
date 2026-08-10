const STORAGE_KEY = 'yj-personal-os-v1';

const CATEGORY_OPTIONS = ['LIFE', 'CLASS', 'WORK', 'TOEFL', 'PORTFOLIO'];
const WORD_STATUS_OPTIONS = ['new', 'learning', 'mastered'];
const WRONG_REASON_OPTIONS = ['Vocabulary', 'Paraphrase', 'Sentence Structure', 'Inference', 'Question Type', 'Careless Mistake'];

const seedState = {
  tasks: [
    { id: uid(), title: 'Review TOEFL reading set', category: 'TOEFL', date: offsetDate(0), time: '07:30', completed: false, memo: '10-minute skim before breakfast.' },
    { id: uid(), title: 'Work: portfolio outline', category: 'PORTFOLIO', date: offsetDate(0), time: '10:30', completed: true, memo: 'Keep the notes short.' },
    { id: uid(), title: 'Class prep checklist', category: 'CLASS', date: offsetDate(1), time: '14:00', completed: false, memo: 'Bring printed notes.' },
    { id: uid(), title: 'Life admin: bank transfer', category: 'LIFE', date: offsetDate(2), time: '', completed: false, memo: 'Pay before evening.' }
  ],
  schedules: [
    { id: uid(), title: 'Morning writing sprint', category: 'TOEFL', date: offsetDate(0), startTime: '08:00', endTime: '08:40', memo: 'Timed essay review.' },
    { id: uid(), title: 'Study abroad research', category: 'PORTFOLIO', date: offsetDate(0), startTime: '13:20', endTime: '14:10', memo: 'Compare programs.' },
    { id: uid(), title: 'Lecture', category: 'CLASS', date: offsetDate(1), startTime: '15:00', endTime: '16:30', memo: 'Focus on question patterns.' }
  ],
  vocabulary: [
    wordSeed('conduct', '지휘하다, 수행하다', 'verb', 'carry out / perform', 'The experiment was conducted carefully.', 'Day 01', 'important', 'mastered', 4),
    wordSeed('devise', '고안하다', 'verb', 'invent / design', 'They devised a practical solution.', 'Day 01', 'important', 'learning', 1),
    wordSeed('tedious', '지루한, 번거로운, 오래 걸리는', 'adjective', 'boring / tiresome', 'The task became tedious after a while.', 'Day 02', 'normal', 'learning', 0),
    wordSeed('neutralize', '상쇄하다', 'verb', 'offset / cancel out', 'The acid was neutralized with a base.', 'Day 02', 'important', 'learning', 1),
    wordSeed('momentum', '운동량', 'noun', 'impetus / drive', 'The team gained momentum after the break.', 'Day 02', 'normal', 'new', 0),
    wordSeed('utilize', '이용하다', 'verb', 'use / employ', 'We can utilize the data more efficiently.', 'Day 03', 'important', 'mastered', 4),
    wordSeed('reliable', '신뢰할 수 있는', 'adjective', 'dependable / trustworthy', 'She is a reliable source.', 'Day 03', 'important', 'mastered', 4),
    wordSeed('capability', '능력', 'noun', 'ability / capacity', 'The device has impressive capability.', 'Day 03', 'normal', 'learning', 1),
    wordSeed('stepped', '계단식의', 'adjective', 'tiered / layered', 'The stepped structure was easy to see.', 'Day 03', 'normal', 'new', 0),
    wordSeed("beyond one's capabilities", '능력 밖이다, 할 수 없다', 'phrase', 'outside one’s ability', 'The task was beyond one’s capabilities.', 'Day 03', 'important', 'learning', 1),
    wordSeed('be associated with', '~와 관련되다', 'phrase', 'be linked to', 'The symptom is associated with stress.', 'Day 03', 'important', 'learning', 1),
    wordSeed('prefer A to B', 'B보다 A를 선호하다', 'phrase', 'choose A over B', 'Students often prefer reading to listening.', 'Day 03', 'normal', 'new', 0)
  ],
  wrongAnswers: [
    wrongSeed(offsetDate(0), 'Reading', 'Fact question', 'D', 'B', 'Vocabulary', "beyond one's capabilities의 뜻을 몰라서 B를 제거함", 'beyond one\'s capabilities'),
    wrongSeed(offsetDate(0), 'Reading', 'Negative Fact question', 'B', 'D', 'Vocabulary / Inference', "stepped를 layer upon layer로 추측함", 'stepped'),
    wrongSeed(offsetDate(1), 'Reading', 'Sentence Simplification', 'B', 'C', 'Sentence Structure', 'springs와 moving parts의 역할을 반대로 이해함', 'moving parts'),
    wrongSeed(offsetDate(1), 'Listening', 'Paraphrase item', 'A', 'C', 'Paraphrase', '문장의 핵심 표현을 동의어로 연결하지 못함', 'utilize'),
    wrongSeed(offsetDate(2), 'Reading', 'Inference item', 'C', 'A', 'Inference', '지문 근거를 지나치게 넓게 해석함', 'conduct')
  ],
  studyLogs: [
    { id: uid(), date: offsetDate(0), book: 'Official Guide', day: 'Day 03', totalQuestions: 14, correctQuestions: 12, minutes: 38, newWords: 6 },
    { id: uid(), date: offsetDate(1), book: 'Reading Practice', day: 'Day 02', totalQuestions: 10, correctQuestions: 8, minutes: 25, newWords: 4 }
  ],
  memos: [
    { id: uid(), date: offsetDate(0), title: 'Morning note', body: 'Read one passage, then review only the wrong words.' },
    { id: uid(), date: offsetDate(1), title: 'Study reminder', body: 'Keep the capture flow under 10 seconds.' }
  ],
  ui: {
    view: 'TODAY',
    toeflTab: 'TODAY',
    archiveDate: 'ALL'
  }
};

const els = {};
let state = loadState();
let editorMode = 'task';
let editingId = null;
let currentReviewId = null;
let reviewRevealed = false;
let toastTimer = null;

document.addEventListener('DOMContentLoaded', init);

function init() {
  cacheElements();
  bindUI();
  ensureCurrentReview();
  renderAll();
  setInterval(tickClock, 1000);
  registerServiceWorker();
}

function cacheElements() {
  els.nowLabel = document.querySelector('[data-now-label]');
  els.syncStatus = document.querySelector('[data-sync-status]');
  els.liveClock = document.querySelector('[data-live-clock]');
  els.clockHour = document.querySelector('[data-clock-hour]');
  els.clockMinute = document.querySelector('[data-clock-minute]');
  els.clockSecond = document.querySelector('[data-clock-second]');
  els.todayTaskCount = document.querySelector('[data-today-task-count]');
  els.todayDoneCount = document.querySelector('[data-today-done-count]');
  els.dueCount = document.querySelector('[data-due-count]');
  els.nextSchedule = document.querySelector('[data-next-schedule]');
  els.todayTaskList = document.querySelector('[data-today-task-list]');
  els.todayScheduleList = document.querySelector('[data-today-schedule-list]');
  els.todayMemoList = document.querySelector('[data-today-memo-list]');
  els.weekStrip = document.querySelector('[data-week-strip]');
  els.planTaskList = document.querySelector('[data-plan-task-list]');
  els.planScheduleList = document.querySelector('[data-plan-schedule-list]');
  els.toeflDay = document.querySelector('[data-toefl-day]');
  els.toeflDayline = document.querySelector('[data-toefl-dayline]');
  els.toeflScore = document.querySelector('[data-toefl-score]');
  els.toeflPercent = document.querySelector('[data-toefl-percent]');
  els.toeflTodayRecord = document.querySelector('[data-toefl-today-record]');
  els.wordPeek = document.querySelector('[data-word-peek]');
  els.wordList = document.querySelector('[data-word-list]');
  els.reviewCard = document.querySelector('[data-review-card]');
  els.reviewQueue = document.querySelector('[data-review-queue]');
  els.reviewQueueList = document.querySelector('[data-review-queue-list]');
  els.wrongList = document.querySelector('[data-wrong-list]');
  els.reasonChart = document.querySelector('[data-reason-chart]');
  els.statAccuracy = document.querySelector('[data-stat-accuracy]');
  els.statQuestions = document.querySelector('[data-stat-questions]');
  els.statVocab = document.querySelector('[data-stat-vocab]');
  els.statMastered = document.querySelector('[data-stat-mastered]');
  els.archiveSearch = document.querySelector('[data-archive-search]');
  els.archiveTabs = document.querySelector('[data-archive-tabs]');
  els.archiveList = document.querySelector('[data-archive-list]');
  els.editorDialog = document.getElementById('editor-dialog');
  els.editorForm = document.getElementById('editor-form');
  els.editorTitle = document.querySelector('[data-editor-title]');
  els.editorFields = document.querySelector('[data-editor-fields]');
  els.toast = document.getElementById('toast');

  els.mainTabs = [...document.querySelectorAll('[data-view-tab]')];
  els.toeflTabs = [...document.querySelectorAll('[data-toefl-tab]')];
  els.captureButtons = [...document.querySelectorAll('[data-open-capture]')];
  els.jumpButtons = [...document.querySelectorAll('[data-view-jump]')];
  els.closeButtons = [...document.querySelectorAll('[data-editor-close]')];
  els.editorTypeButtons = [...document.querySelectorAll('[data-editor-type]')];
}

function bindUI() {
  els.mainTabs.forEach((button) => button.addEventListener('click', () => setView(button.dataset.viewTab)));
  els.jumpButtons.forEach((button) => button.addEventListener('click', () => setView(button.dataset.viewJump)));
  els.toeflTabs.forEach((button) => button.addEventListener('click', () => setToeflTab(button.dataset.toeflTab)));
  els.captureButtons.forEach((button) => button.addEventListener('click', () => openEditor(button.dataset.openCapture)));
  els.closeButtons.forEach((button) => button.addEventListener('click', closeEditor));
  els.editorTypeButtons.forEach((button) => button.addEventListener('click', () => switchEditorType(button.dataset.editorType)));
  els.editorForm.addEventListener('submit', handleEditorSubmit);
  els.archiveSearch.addEventListener('input', renderArchive);
  els.archiveTabs.addEventListener('click', handleArchiveTabClick);
  document.addEventListener('click', handleDelegatedClick);
  document.addEventListener('keydown', handleHotkeys);

  els.editorDialog.addEventListener('click', (event) => {
    const rect = els.editorDialog.getBoundingClientRect();
    const inside = rect.left <= event.clientX && event.clientX <= rect.right && rect.top <= event.clientY && event.clientY <= rect.bottom;
    if (!inside) closeEditor();
  });
}

function handleDelegatedClick(event) {
  const reviewAction = event.target.closest('[data-review-action]');
  if (reviewAction) {
    applyReview(reviewAction.dataset.reviewAction);
    return;
  }

  const reviewPick = event.target.closest('[data-review-pick]');
  if (reviewPick) {
    currentReviewId = reviewPick.dataset.reviewPick;
    reviewRevealed = false;
    renderToefl();
    return;
  }

  const taskToggle = event.target.closest('[data-task-toggle]');
  if (taskToggle) {
    toggleTask(taskToggle.dataset.taskToggle);
    return;
  }

  const editButton = event.target.closest('[data-edit-type]');
  if (editButton) {
    editItem(editButton.dataset.editType, editButton.dataset.editId);
    return;
  }

  const deleteButton = event.target.closest('[data-delete-type]');
  if (deleteButton) {
    deleteItem(deleteButton.dataset.deleteType, deleteButton.dataset.deleteId);
    return;
  }

  const memoEdit = event.target.closest('[data-memo-edit]');
  if (memoEdit) {
    editMemo(memoEdit.dataset.memoEdit);
  }
}

function handleHotkeys(event) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    openEditor('task');
  }
}

function handleArchiveTabClick(event) {
  const button = event.target.closest('[data-archive-date]');
  if (!button) return;
  state.ui.archiveDate = button.dataset.archiveDate;
  persist();
  renderArchive();
}

function setView(view) {
  state.ui.view = view;
  persist();
  renderAll();
}

function setToeflTab(tab) {
  state.ui.toeflTab = tab;
  persist();
  renderToefl();
}

function switchEditorType(mode) {
  editorMode = mode;
  editingId = null;
  renderEditor();
}

function openEditor(mode = 'task', item = null) {
  editorMode = mode;
  editingId = item?.id || null;
  renderEditor(item);
  els.editorDialog.showModal();
}

function closeEditor() {
  if (els.editorDialog.open) els.editorDialog.close();
}

function editItem(type, id) {
  const item = getCollection(type).find((entry) => entry.id === id);
  if (item) openEditor(type, item);
}

function editMemo(id) {
  const item = state.memos.find((entry) => entry.id === id);
  if (item) openEditor('memo', item);
}

function toggleTask(id) {
  const task = state.tasks.find((entry) => entry.id === id);
  if (!task) return;
  task.completed = !task.completed;
  persist();
  renderAll();
  toast(task.completed ? 'Task completed.' : 'Task reopened.');
}

function deleteItem(type, id) {
  const collection = getCollection(type);
  const index = collection.findIndex((entry) => entry.id === id);
  if (index < 0) return;
  collection.splice(index, 1);
  if (type === 'word' && currentReviewId === id) {
    currentReviewId = null;
    reviewRevealed = false;
  }
  persist();
  renderAll();
  toast(`${type} deleted.`);
}

function handleEditorSubmit(event) {
  event.preventDefault();
  const formData = new FormData(els.editorForm);
  const payload = buildPayload(editorMode, formData);
  const collection = getCollection(editorMode);

  if (editingId) {
    const index = collection.findIndex((entry) => entry.id === editingId);
    if (index >= 0) collection[index] = { ...collection[index], ...payload };
  } else {
    collection.unshift({ id: uid(), ...payload });
  }

  if (editorMode === 'word') {
    currentReviewId = collection[0]?.id || currentReviewId;
    reviewRevealed = false;
  }

  editingId = null;
  persist();
  closeEditor();
  renderAll();
  toast('Saved.');
}

function buildPayload(mode, formData) {
  const data = Object.fromEntries([...formData.entries()].map(([key, value]) => [key, String(value).trim()]));
  if (mode === 'task') {
    return {
      title: data.title || 'Untitled task',
      category: data.category || 'LIFE',
      date: data.date || todayISO(),
      time: data.time || '',
      completed: data.completed === 'on',
      memo: data.memo || ''
    };
  }
  if (mode === 'schedule') {
    return {
      title: data.title || 'Untitled schedule',
      category: data.category || 'LIFE',
      date: data.date || todayISO(),
      startTime: data.startTime || '',
      endTime: data.endTime || '',
      memo: data.memo || ''
    };
  }
  if (mode === 'word') {
    return {
      word: data.word || 'new word',
      meaning: data.meaning || '',
      pos: data.pos || 'noun',
      paraphrase: data.paraphrase || '',
      example: data.example || '',
      sourceDay: data.sourceDay || 'Day 01',
      importance: data.importance || 'normal',
      status: data.status || 'new',
      reviewScore: Number(data.reviewScore || 0),
      nextReviewAt: data.nextReviewAt || todayISO(),
      lastReviewed: data.lastReviewed || ''
    };
  }
  if (mode === 'wrong') {
    return {
      date: data.date || todayISO(),
      type: data.type || 'Reading',
      question: data.question || 'Question',
      myAnswer: data.myAnswer || '',
      correctAnswer: data.correctAnswer || '',
      reason: data.reason || 'Vocabulary',
      linkedVocabulary: data.linkedVocabulary || '',
      note: data.note || ''
    };
  }
  return {
    date: data.date || todayISO(),
    title: data.title || 'Memo',
    body: data.body || ''
  };
}

function renderAll() {
  renderViewState();
  tickClock();
  renderToday();
  renderPlan();
  renderToefl();
  renderArchive();
  renderMeta();
}

function renderViewState() {
  document.querySelectorAll('[data-view]').forEach((section) => {
    section.classList.toggle('is-active', section.dataset.view === state.ui.view);
  });
  els.mainTabs.forEach((button) => button.classList.toggle('is-active', button.dataset.viewTab === state.ui.view));
  document.querySelectorAll('.bottom-nav__item').forEach((button) => button.classList.toggle('is-active', button.dataset.viewTab === state.ui.view));
}

function renderMeta() {
  const now = new Date();
  els.nowLabel.textContent = formatCompactDate(now);
  els.syncStatus.textContent = 'LOCAL';
}

function tickClock() {
  const now = new Date();
  els.liveClock.textContent = formatTime(now);
  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;
  els.clockHour.style.transform = `translateY(-50%) rotate(${hours * 30}deg)`;
  els.clockMinute.style.transform = `translateY(-50%) rotate(${minutes * 6}deg)`;
  els.clockSecond.style.transform = `translateY(-50%) rotate(${seconds * 6}deg)`;
}

function renderToday() {
  const today = todayISO();
  const todayTasks = state.tasks.filter((task) => task.date === today);
  const doneTasks = todayTasks.filter((task) => task.completed);
  const todaySchedules = state.schedules.filter((schedule) => schedule.date === today).sort(byStartTime);
  const nextSchedule = todaySchedules.find((schedule) => timeToMinutes(schedule.startTime) >= currentMinutes()) || todaySchedules[0] || null;
  const study = studyForDate(today);
  const due = getDueWords();

  els.todayTaskCount.textContent = String(todayTasks.length);
  els.todayDoneCount.textContent = String(doneTasks.length);
  els.dueCount.textContent = String(due.length);
  els.nextSchedule.textContent = nextSchedule ? `${nextSchedule.startTime || '--:--'} · ${nextSchedule.title}` : 'No schedule yet';
  els.toeflDay.textContent = dayNumberFor(today);

  els.todayTaskList.innerHTML = renderTaskList(todayTasks);
  els.todayScheduleList.innerHTML = renderScheduleTimeline(todaySchedules);
  els.todayMemoList.innerHTML = renderMemoCards(state.memos.filter((memo) => memo.date === today));

  const statTargets = [
    { el: els.toeflScore, value: `${study.correctQuestions} / ${study.totalQuestions}` },
    { el: els.toeflPercent, value: `${Math.round(study.accuracy)}%` }
  ];
  statTargets.forEach(({ el, value }) => { if (el) el.textContent = value; });
}

function renderPlan() {
  const weekStart = startOfWeek(new Date());
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(weekStart, index);
    const iso = toISODate(date);
    return {
      iso,
      label: shortDayLabel(date),
      count: state.tasks.filter((task) => task.date === iso).length + state.schedules.filter((schedule) => schedule.date === iso).length
    };
  });

  els.weekStrip.innerHTML = days.map((day) => `
    <article class="memo-card">
      <div class="memo-card__title">
        <span>${day.label}</span>
        <span class="badge badge--blue">${day.count}</span>
      </div>
      <p class="memo-card__body">${day.iso}</p>
    </article>
  `).join('');

  els.planTaskList.innerHTML = renderTaskTable([...state.tasks].sort(byDateAndTime), true);
  els.planScheduleList.innerHTML = renderScheduleTable([...state.schedules].sort(byDateAndTime), true);
}

function renderToefl() {
  const today = todayISO();
  const study = studyForDate(today);
  const due = getDueWords();
  const activeTab = state.ui.toeflTab;

  els.toeflDayline.textContent = dayNumberFor(today).toString().padStart(2, '0');
  els.toeflScore.textContent = `${study.correctQuestions} / ${study.totalQuestions}`;
  els.toeflPercent.textContent = `${Math.round(study.accuracy)}%`;
  els.toeflTabs.forEach((button) => button.classList.toggle('is-active', button.dataset.toeflTab === activeTab));
  document.querySelectorAll('[data-toefl-panel]').forEach((panel) => panel.classList.toggle('is-active', panel.dataset.toeflPanel === activeTab));

  els.toeflTodayRecord.innerHTML = `
    <div><dt>Book</dt><dd>${escapeHtml(study.book)}</dd></div>
    <div><dt>Day</dt><dd>${escapeHtml(study.day)}</dd></div>
    <div><dt>Total</dt><dd>${study.totalQuestions}</dd></div>
    <div><dt>Correct</dt><dd>${study.correctQuestions}</dd></div>
    <div><dt>Accuracy</dt><dd>${Math.round(study.accuracy)}%</dd></div>
    <div><dt>Time</dt><dd>${study.minutes} min</dd></div>
    <div><dt>New words</dt><dd>${study.newWords}</dd></div>
  `;

  const peek = due[0] || [...state.vocabulary].sort((a, b) => (b.reviewScore || 0) - (a.reviewScore || 0))[0] || null;
  els.wordPeek.innerHTML = peek ? renderWordPeek(peek) : '<p class="memo-card__body">No vocabulary yet. Add the first word and start reviewing.</p>';
  els.reviewQueue.textContent = `${due.length} due`;
  els.reviewCard.innerHTML = renderReviewCard();
  els.reviewQueueList.innerHTML = due.slice(0, 5).map((word) => `
    <article class="review-queue-item">
      <div class="memo-card__title">
        <span>${escapeHtml(word.word)}</span>
        <button class="small-control small-control--blue" type="button" data-review-pick="${word.id}">review</button>
      </div>
      <p class="review-queue-item__body">${escapeHtml(word.meaning)} · ${escapeHtml(word.sourceDay)} · ${escapeHtml(word.status)}</p>
    </article>
  `).join('') || '<p class="memo-card__body">No due words. Everything is caught up for today.</p>';

  els.wordList.innerHTML = renderWordTable([...state.vocabulary].sort((a, b) => compareStrings(a.word, b.word)));
  els.wrongList.innerHTML = renderWrongTable([...state.wrongAnswers].sort(byDateAndTime));
  els.reasonChart.innerHTML = renderReasonChart();

  const stats = getStats();
  els.statAccuracy.textContent = `${Math.round(stats.accuracy)}%`;
  els.statQuestions.textContent = String(stats.totalQuestions);
  els.statVocab.textContent = String(state.vocabulary.length);
  els.statMastered.textContent = String(state.vocabulary.filter((word) => word.status === 'mastered').length);
}

function renderArchive() {
  const query = els.archiveSearch.value.trim().toLowerCase();
  const groups = buildArchiveGroups(query);
  const allDates = [...groups.keys()].sort((a, b) => b.localeCompare(a));
  const filteredDates = state.ui.archiveDate === 'ALL' ? allDates : allDates.filter((date) => date === state.ui.archiveDate);

  els.archiveTabs.innerHTML = ['ALL', ...allDates].map((date) => `
    <button class="subtab ${state.ui.archiveDate === date ? 'is-active' : ''}" type="button" data-archive-date="${date}">
      ${date === 'ALL' ? 'ALL' : formatArchiveLabel(date)}
    </button>
  `).join('');

  if (!filteredDates.length) {
    els.archiveList.innerHTML = '<article class="panel"><p class="memo-card__body">No archive matches your search.</p></article>';
    return;
  }

  els.archiveList.innerHTML = filteredDates.map((date) => {
    const items = groups.get(date) || [];
    return `
      <article class="panel archive-card">
        <div class="archive-card__meta-line">
          <span class="badge badge--ink">${formatArchiveLabel(date)}</span>
          <span class="badge badge--blue">${items.length} items</span>
        </div>
        <h3 class="archive-card__title">${formatArchiveLabel(date)}</h3>
        <div class="archive-card__body">${items.map((item) => item.html).join('')}</div>
      </article>
    `;
  }).join('');
}

function renderEditor(item = null) {
  const labels = {
    task: 'Add task',
    schedule: 'Add schedule',
    word: 'Add vocabulary',
    wrong: 'Add wrong answer',
    memo: 'Add memo'
  };
  els.editorTitle.textContent = item ? `Edit ${editorMode}` : labels[editorMode];
  els.editorFields.innerHTML = renderEditorFields(editorMode, item);
  els.editorTypeButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.editorType === editorMode));
}

function renderEditorFields(mode, item) {
  const value = (key, fallback = '') => escapeAttr(item?.[key] ?? fallback);
  if (mode === 'task') {
    return [
      field('Title', `<input name="title" required value="${value('title')}" />`),
      field('Category', select('category', CATEGORY_OPTIONS, item?.category || 'LIFE')),
      field('Date', `<input name="date" type="date" required value="${value('date', todayISO())}" />`),
      field('Time', `<input name="time" type="time" value="${value('time')}" />`),
      field('Completed', `<label class="toggle-row"><input name="completed" type="checkbox" ${item?.completed ? 'checked' : ''} /> <span>mark complete</span></label>`),
      field('Memo', `<textarea name="memo" placeholder="short note">${escapeHtml(item?.memo || '')}</textarea>`)
    ].join('');
  }
  if (mode === 'schedule') {
    return [
      field('Title', `<input name="title" required value="${value('title')}" />`),
      field('Category', select('category', CATEGORY_OPTIONS, item?.category || 'LIFE')),
      field('Date', `<input name="date" type="date" required value="${value('date', todayISO())}" />`),
      `<div class="split-fields">${field('Start time', `<input name="startTime" type="time" value="${value('startTime')}" />`)}${field('End time', `<input name="endTime" type="time" value="${value('endTime')}" />`)}</div>`,
      field('Memo', `<textarea name="memo" placeholder="short note">${escapeHtml(item?.memo || '')}</textarea>`)
    ].join('');
  }
  if (mode === 'word') {
    return [
      field('Word', `<input name="word" required value="${value('word')}" />`),
      field('Meaning', `<input name="meaning" required value="${value('meaning')}" />`),
      `<div class="split-fields">${field('Part of speech', `<input name="pos" value="${value('pos', 'noun')}" />`)}${field('Source day', `<input name="sourceDay" value="${value('sourceDay', 'Day 01')}" />`)}</div>`,
      field('Paraphrase', `<input name="paraphrase" value="${value('paraphrase')}" />`),
      field('Example', `<textarea name="example">${escapeHtml(item?.example || '')}</textarea>`),
      `<div class="split-fields">${field('Importance', select('importance', ['normal', 'important'], item?.importance || 'normal'))}${field('Status', select('status', WORD_STATUS_OPTIONS, item?.status || 'new'))}</div>`,
      `<div class="split-fields">${field('Review score', `<input name="reviewScore" type="number" min="-3" max="5" value="${escapeAttr(item?.reviewScore ?? 0)}" />`)}${field('Next review', `<input name="nextReviewAt" type="date" value="${value('nextReviewAt', todayISO())}" />`)}</div>`,
      field('Last reviewed', `<input name="lastReviewed" type="date" value="${value('lastReviewed')}" />`)
    ].join('');
  }
  if (mode === 'wrong') {
    return [
      field('Date', `<input name="date" type="date" required value="${value('date', todayISO())}" />`),
      field('Type', `<input name="type" value="${value('type', 'Reading')}" />`),
      field('Question', `<input name="question" required value="${value('question')}" />`),
      `<div class="split-fields">${field('My answer', `<input name="myAnswer" value="${value('myAnswer')}" />`)}${field('Correct answer', `<input name="correctAnswer" value="${value('correctAnswer')}" />`)}</div>`,
      field('Reason', select('reason', WRONG_REASON_OPTIONS, item?.reason || 'Vocabulary')),
      field('Linked vocabulary', `<input name="linkedVocabulary" value="${value('linkedVocabulary')}" />`),
      field('Note', `<textarea name="note">${escapeHtml(item?.note || '')}</textarea>`)
    ].join('');
  }
  return [
    field('Date', `<input name="date" type="date" required value="${value('date', todayISO())}" />`),
    field('Title', `<input name="title" required value="${value('title')}" />`),
    field('Body', `<textarea name="body">${escapeHtml(item?.body || '')}</textarea>`)
  ].join('');
}

function renderTaskList(tasks) {
  if (!tasks.length) return '<p class="memo-card__body">No tasks for today.</p>';
  return tasks.map((task) => `
    <article class="timeline__item">
      <div class="row-meta">
        <span class="timeline__time">${escapeHtml(task.time || '--:--')}</span>
        <span class="badge ${task.completed ? 'badge--lime' : 'badge--blue'}">${escapeHtml(task.category)}</span>
      </div>
      <h3 class="timeline__title">${escapeHtml(task.title)}</h3>
      <p class="timeline__note">${escapeHtml(task.memo || '')}</p>
      <div class="row-meta">
        <button class="small-control ${task.completed ? 'small-control--ink' : 'small-control--lime'}" type="button" data-task-toggle="${task.id}">${task.completed ? 'open' : 'done'}</button>
        <button class="small-control" type="button" data-edit-type="task" data-edit-id="${task.id}">edit</button>
        <button class="small-control" type="button" data-delete-type="task" data-delete-id="${task.id}">delete</button>
      </div>
    </article>
  `).join('');
}

function renderTaskTable(tasks, showDates = false) {
  if (!tasks.length) return '<p class="memo-card__body">No tasks yet.</p>';
  return `
    <table>
      <thead>
        <tr>
          <th>Task</th>
          ${showDates ? '<th>Date</th>' : ''}
          <th>Category</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${tasks.map((task) => `
          <tr>
            <td>
              <div class="row-title">${escapeHtml(task.title)}</div>
              <div class="timeline__note">${escapeHtml(task.memo || '')}</div>
            </td>
            ${showDates ? `<td>${escapeHtml(task.date)}${task.time ? ` · ${escapeHtml(task.time)}` : ''}</td>` : ''}
            <td><span class="badge badge--blue">${escapeHtml(task.category)}</span></td>
            <td><span class="badge ${task.completed ? 'badge--lime' : 'badge--ink'}">${task.completed ? 'done' : 'open'}</span></td>
            <td>
              <div class="table-action">
                <button class="small-control ${task.completed ? 'small-control--ink' : 'small-control--lime'}" type="button" data-task-toggle="${task.id}">${task.completed ? 'reopen' : 'done'}</button>
                <button class="small-control" type="button" data-edit-type="task" data-edit-id="${task.id}">edit</button>
                <button class="small-control" type="button" data-delete-type="task" data-delete-id="${task.id}">del</button>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderScheduleTimeline(schedules) {
  if (!schedules.length) return '<p class="memo-card__body">No schedules for today.</p>';
  return schedules.map((schedule) => `
    <article class="timeline__item">
      <div class="row-meta">
        <span class="timeline__time">${escapeHtml(schedule.startTime || '--:--')} - ${escapeHtml(schedule.endTime || '--:--')}</span>
        <span class="badge badge--ink">${escapeHtml(schedule.category)}</span>
      </div>
      <h3 class="timeline__title">${escapeHtml(schedule.title)}</h3>
      <p class="timeline__note">${escapeHtml(schedule.memo || '')}</p>
      <div class="row-meta">
        <button class="small-control" type="button" data-edit-type="schedule" data-edit-id="${schedule.id}">edit</button>
        <button class="small-control" type="button" data-delete-type="schedule" data-delete-id="${schedule.id}">delete</button>
      </div>
    </article>
  `).join('');
}

function renderScheduleTable(schedules, showDates = false) {
  if (!schedules.length) return '<p class="memo-card__body">No schedules yet.</p>';
  return `
    <table>
      <thead>
        <tr>
          <th>Schedule</th>
          ${showDates ? '<th>Date</th>' : ''}
          <th>Time</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${schedules.map((schedule) => `
          <tr>
            <td>
              <div class="row-title">${escapeHtml(schedule.title)}</div>
              <div class="timeline__note">${escapeHtml(schedule.memo || '')}</div>
            </td>
            ${showDates ? `<td>${escapeHtml(schedule.date)}</td>` : ''}
            <td>${escapeHtml(schedule.startTime || '--:--')} - ${escapeHtml(schedule.endTime || '--:--')}</td>
            <td><span class="badge badge--ink">${escapeHtml(schedule.category)}</span></td>
            <td>
              <div class="table-action">
                <button class="small-control" type="button" data-edit-type="schedule" data-edit-id="${schedule.id}">edit</button>
                <button class="small-control" type="button" data-delete-type="schedule" data-delete-id="${schedule.id}">del</button>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderMemoCards(memos) {
  if (!memos.length) return '<p class="memo-card__body">No memos yet. Capture one in under 10 seconds.</p>';
  return memos.map((memo) => `
    <article class="memo-card">
      <div class="memo-card__title">
        <span>${escapeHtml(memo.title)}</span>
        <span class="badge badge--blue">${escapeHtml(memo.date)}</span>
      </div>
      <p class="memo-card__body">${escapeHtml(memo.body)}</p>
      <div class="row-meta">
        <button class="small-control" type="button" data-memo-edit="${memo.id}">edit</button>
        <button class="small-control" type="button" data-delete-type="memo" data-delete-id="${memo.id}">delete</button>
      </div>
    </article>
  `).join('');
}

function renderWordPeek(word) {
  return `
    <div>
      <p class="panel__eyebrow">due word</p>
      <div class="word-peek__word">${escapeHtml(word.word)}</div>
    </div>
    <div class="word-peek__meta">${escapeHtml(word.meaning)} · ${escapeHtml(word.pos)} · ${escapeHtml(word.sourceDay)}</div>
    <div class="word-peek__example">${escapeHtml(word.example || '')}</div>
    <div class="word-peek__actions">
      <button class="small-control small-control--blue" type="button" data-view-jump="TOEFL">review now</button>
      <button class="small-control" type="button" data-edit-type="word" data-edit-id="${word.id}">edit</button>
    </div>
  `;
}

function renderWordTable(words) {
  if (!words.length) return '<p class="memo-card__body">No vocabulary yet.</p>';
  return `
    <table>
      <thead>
        <tr>
          <th>Word</th>
          <th>Meaning</th>
          <th>Day</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${words.map((word) => `
          <tr>
            <td>
              <div class="row-title">${escapeHtml(word.word)}</div>
              <div class="timeline__note">${escapeHtml(word.paraphrase || '')}</div>
            </td>
            <td>${escapeHtml(word.meaning)}</td>
            <td>${escapeHtml(word.sourceDay)}</td>
            <td><span class="badge ${word.status === 'mastered' ? 'badge--lime' : word.status === 'learning' ? 'badge--blue' : 'badge--ink'}">${escapeHtml(word.status)}</span></td>
            <td>
              <div class="table-action">
                <button class="small-control" type="button" data-edit-type="word" data-edit-id="${word.id}">edit</button>
                <button class="small-control" type="button" data-delete-type="word" data-delete-id="${word.id}">del</button>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderWrongTable(wrongs) {
  if (!wrongs.length) return '<p class="memo-card__body">No wrong answers yet.</p>';
  return `
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Question</th>
          <th>Reason</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${wrongs.map((wrong) => `
          <tr>
            <td>${escapeHtml(wrong.date)}</td>
            <td>
              <div class="row-title">${escapeHtml(wrong.question)}</div>
              <div class="timeline__note">${escapeHtml(wrong.myAnswer)} → ${escapeHtml(wrong.correctAnswer)}</div>
              <div class="timeline__note">${escapeHtml(wrong.note || '')}</div>
            </td>
            <td><span class="badge badge--blue">${escapeHtml(renderReasonLabel(wrong.reason))}</span></td>
            <td>
              <div class="table-action">
                <button class="small-control" type="button" data-edit-type="wrong" data-edit-id="${wrong.id}">edit</button>
                <button class="small-control" type="button" data-delete-type="wrong" data-delete-id="${wrong.id}">del</button>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderReasonChart() {
  const counts = WRONG_REASON_OPTIONS.map((reason) => ({
    reason,
    total: state.wrongAnswers.filter((wrong) => normalizeReason(wrong.reason) === normalizeReason(reason)).length
  }));
  const max = Math.max(1, ...counts.map((entry) => entry.total));
  return counts.map((entry) => `
    <div class="bar-chart__row">
      <div class="bar-chart__label">${escapeHtml(entry.reason)}</div>
      <div class="bar-chart__track"><div class="bar-chart__fill" style="width:${(entry.total / max) * 100}%"></div></div>
      <div class="bar-chart__value">${entry.total}</div>
    </div>
  `).join('');
}

function renderReviewCard() {
  const deck = getDueWords();
  const active = state.vocabulary.find((word) => word.id === currentReviewId) || deck[0] || state.vocabulary[0];
  if (!active) {
    return '<p class="memo-card__body">Add the first vocabulary item to start the review loop.</p>';
  }
  currentReviewId = active.id;
  return `
    <div class="review-card__front">
      <div>
        <p class="panel__eyebrow">front</p>
        <div class="review-card__word">${escapeHtml(active.word)}</div>
      </div>
      <div class="row-meta">
        <span class="badge badge--blue">${escapeHtml(active.sourceDay)}</span>
        <span class="badge ${active.status === 'mastered' ? 'badge--lime' : active.status === 'learning' ? 'badge--blue' : 'badge--ink'}">${escapeHtml(active.status)}</span>
      </div>
    </div>
    <div class="review-card__back">
      <div>
        <p class="panel__eyebrow">back</p>
        <div class="review-card__word">${reviewRevealed ? escapeHtml(active.meaning) : 'Tap a button to reveal the answer.'}</div>
      </div>
      <div class="review-card__meaning">${reviewRevealed ? `${escapeHtml(active.paraphrase || '')}<br />${escapeHtml(active.example || '')}` : 'I KNOW / UNSURE / AGAIN will update spacing and priority.'}</div>
    </div>
  `;
}

function applyReview(action) {
  const deck = getDueWords();
  const active = state.vocabulary.find((word) => word.id === currentReviewId) || deck[0];
  if (!active) {
    toast('No review word is available.');
    return;
  }
  currentReviewId = active.id;
  reviewRevealed = true;

  const delta = action === 'know' ? 2 : action === 'unsure' ? 1 : -1;
  active.reviewScore = clamp((active.reviewScore || 0) + delta, -3, 5);
  active.lastReviewed = todayISO();
  active.nextReviewAt = offsetDate(action === 'again' ? 1 : action === 'unsure' ? 2 : Math.min(14, 3 + active.reviewScore * 2));
  active.status = active.reviewScore >= 3 ? 'mastered' : active.reviewScore >= 1 ? 'learning' : 'new';

  persist();
  renderToefl();
  toast(`Marked ${action.toUpperCase()}.`);
}

function renderArchiveGroups(query) {
  const groups = new Map();
  const push = (date, html) => {
    if (!date) return;
    if (query && !html.toLowerCase().includes(query)) return;
    if (!groups.has(date)) groups.set(date, []);
    groups.get(date).push({ html });
  };

  state.tasks.forEach((task) => push(task.date, `
    <div class="archive-card__meta-line"><span class="badge badge--blue">TASK</span><span class="timeline__time">${escapeHtml(task.time || '--:--')}</span></div>
    <div class="archive-card__title">${escapeHtml(task.title)}</div>
    <div class="archive-card__body">${escapeHtml(task.memo || '')}</div>
  `));
  state.schedules.forEach((schedule) => push(schedule.date, `
    <div class="archive-card__meta-line"><span class="badge badge--ink">SCHEDULE</span><span class="timeline__time">${escapeHtml(schedule.startTime || '--:--')} - ${escapeHtml(schedule.endTime || '--:--')}</span></div>
    <div class="archive-card__title">${escapeHtml(schedule.title)}</div>
    <div class="archive-card__body">${escapeHtml(schedule.memo || '')}</div>
  `));
  state.memos.forEach((memo) => push(memo.date, `
    <div class="archive-card__meta-line"><span class="badge badge--lime">MEMO</span></div>
    <div class="archive-card__title">${escapeHtml(memo.title)}</div>
    <div class="archive-card__body">${escapeHtml(memo.body)}</div>
  `));
  state.vocabulary.forEach((word) => push(word.nextReviewAt || word.sourceDay, `
    <div class="archive-card__meta-line"><span class="badge badge--blue">WORD</span><span>${escapeHtml(word.sourceDay)}</span></div>
    <div class="archive-card__title">${escapeHtml(word.word)}</div>
    <div class="archive-card__body">${escapeHtml(word.meaning)} · ${escapeHtml(word.paraphrase || '')}</div>
  `));
  state.wrongAnswers.forEach((wrong) => push(wrong.date, `
    <div class="archive-card__meta-line"><span class="badge badge--ink">WRONG</span><span>${escapeHtml(renderReasonLabel(wrong.reason))}</span></div>
    <div class="archive-card__title">${escapeHtml(wrong.question)}</div>
    <div class="archive-card__body">${escapeHtml(wrong.note || '')}</div>
  `));
  state.studyLogs.forEach((log) => push(log.date, `
    <div class="archive-card__meta-line"><span class="badge badge--blue">TOEFL</span><span>${escapeHtml(log.book)} · ${escapeHtml(log.day)}</span></div>
    <div class="archive-card__title">${log.totalQuestions} questions</div>
    <div class="archive-card__body">${log.correctQuestions}/${log.totalQuestions} correct · ${log.minutes} min · ${log.newWords} new words</div>
  `));

  return groups;
}

function renderArchive() {
  const query = els.archiveSearch.value.trim().toLowerCase();
  const groups = renderArchiveGroups(query);
  const dates = [...groups.keys()].sort((a, b) => b.localeCompare(a));
  const filteredDates = state.ui.archiveDate === 'ALL' ? dates : dates.filter((date) => date === state.ui.archiveDate);

  els.archiveTabs.innerHTML = ['ALL', ...dates].map((date) => `
    <button class="subtab ${state.ui.archiveDate === date ? 'is-active' : ''}" type="button" data-archive-date="${date}">
      ${date === 'ALL' ? 'ALL' : formatArchiveLabel(date)}
    </button>
  `).join('');

  if (!filteredDates.length) {
    els.archiveList.innerHTML = '<article class="panel"><p class="memo-card__body">No archive matches your search.</p></article>';
    return;
  }

  els.archiveList.innerHTML = filteredDates.map((date) => {
    const items = groups.get(date) || [];
    return `
      <article class="panel archive-card">
        <div class="archive-card__meta-line">
          <span class="badge badge--ink">${formatArchiveLabel(date)}</span>
          <span class="badge badge--blue">${items.length} items</span>
        </div>
        <h3 class="archive-card__title">${formatArchiveLabel(date)}</h3>
        <div class="archive-card__body">${items.map((item) => item.html).join('')}</div>
      </article>
    `;
  }).join('');
}

function getCollection(type) {
  if (type === 'task') return state.tasks;
  if (type === 'schedule') return state.schedules;
  if (type === 'word') return state.vocabulary;
  if (type === 'wrong') return state.wrongAnswers;
  if (type === 'memo') return state.memos;
  return [];
}

function studyForDate(date) {
  const record = state.studyLogs.find((entry) => entry.date === date) || state.studyLogs[0] || {
    book: 'Official Guide',
    day: `Day ${dayNumberFor(date)}`,
    totalQuestions: 0,
    correctQuestions: 0,
    minutes: 0,
    newWords: 0
  };
  return {
    ...record,
    accuracy: record.totalQuestions ? (record.correctQuestions / record.totalQuestions) * 100 : 0
  };
}

function getStats() {
  const totalQuestions = state.studyLogs.reduce((sum, entry) => sum + entry.totalQuestions, 0);
  const correctQuestions = state.studyLogs.reduce((sum, entry) => sum + entry.correctQuestions, 0);
  return {
    totalQuestions,
    accuracy: totalQuestions ? (correctQuestions / totalQuestions) * 100 : 0
  };
}

function getDueWords() {
  const today = todayISO();
  return [...state.vocabulary]
    .filter((word) => !word.nextReviewAt || word.nextReviewAt <= today || (word.status !== 'mastered' && word.reviewScore < 3))
    .sort((a, b) => (a.nextReviewAt || '').localeCompare(b.nextReviewAt || '') || (a.reviewScore || 0) - (b.reviewScore || 0));
}

function renderReasonLabel(reason) {
  return WRONG_REASON_OPTIONS.find((entry) => normalizeReason(entry) === normalizeReason(reason)) || reason;
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage is optional in private browsing.
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return clone(seedState);
    return normalizeState(JSON.parse(raw));
  } catch {
    return clone(seedState);
  }
}

function normalizeState(input) {
  const data = clone(seedState);
  if (input && typeof input === 'object') {
    for (const key of ['tasks', 'schedules', 'vocabulary', 'wrongAnswers', 'studyLogs', 'memos']) {
      if (Array.isArray(input[key])) data[key] = input[key];
    }
    if (input.ui && typeof input.ui === 'object') {
      data.ui = {
        view: ['TODAY', 'PLAN', 'TOEFL', 'ARCHIVE'].includes(input.ui.view) ? input.ui.view : data.ui.view,
        toeflTab: ['TODAY', 'WORDS', 'REVIEW', 'WRONG', 'STATS'].includes(input.ui.toeflTab) ? input.ui.toeflTab : data.ui.toeflTab,
        archiveDate: typeof input.ui.archiveDate === 'string' ? input.ui.archiveDate : data.ui.archiveDate
      };
    }
  }
  return data;
}

function ensureCurrentReview() {
  const due = getDueWords();
  if (!currentReviewId || !state.vocabulary.some((word) => word.id === currentReviewId)) {
    currentReviewId = due[0]?.id || state.vocabulary[0]?.id || null;
  }
}

function renderArchiveLabel(date) {
  return formatArchiveLabel(date);
}

function field(label, control) {
  return `
    <label class="editor-field">
      <span>${label}</span>
      ${control}
    </label>
  `;
}

function select(name, options, selected) {
  return `<select name="${name}">${options.map((option) => `<option value="${option}" ${option === selected ? 'selected' : ''}>${option}</option>`).join('')}</select>`;
}

function buildArchiveGroups(query) {
  const groups = new Map();
  const add = (date, html) => {
    if (!date) return;
    if (query && !html.toLowerCase().includes(query)) return;
    if (!groups.has(date)) groups.set(date, []);
    groups.get(date).push({ html });
  };

  state.tasks.forEach((task) => add(task.date, `<div class="archive-card__meta-line"><span class="badge badge--blue">TASK</span><span class="timeline__time">${escapeHtml(task.time || '--:--')}</span></div><div class="archive-card__title">${escapeHtml(task.title)}</div><div class="archive-card__body">${escapeHtml(task.memo || '')}</div>`));
  state.schedules.forEach((schedule) => add(schedule.date, `<div class="archive-card__meta-line"><span class="badge badge--ink">SCHEDULE</span><span class="timeline__time">${escapeHtml(schedule.startTime || '--:--')} - ${escapeHtml(schedule.endTime || '--:--')}</span></div><div class="archive-card__title">${escapeHtml(schedule.title)}</div><div class="archive-card__body">${escapeHtml(schedule.memo || '')}</div>`));
  state.memos.forEach((memo) => add(memo.date, `<div class="archive-card__meta-line"><span class="badge badge--lime">MEMO</span></div><div class="archive-card__title">${escapeHtml(memo.title)}</div><div class="archive-card__body">${escapeHtml(memo.body)}</div>`));
  state.vocabulary.forEach((word) => add(word.nextReviewAt || word.sourceDay, `<div class="archive-card__meta-line"><span class="badge badge--blue">WORD</span><span>${escapeHtml(word.sourceDay)}</span></div><div class="archive-card__title">${escapeHtml(word.word)}</div><div class="archive-card__body">${escapeHtml(word.meaning)} · ${escapeHtml(word.paraphrase || '')}</div>`));
  state.wrongAnswers.forEach((wrong) => add(wrong.date, `<div class="archive-card__meta-line"><span class="badge badge--ink">WRONG</span><span>${escapeHtml(renderReasonLabel(wrong.reason))}</span></div><div class="archive-card__title">${escapeHtml(wrong.question)}</div><div class="archive-card__body">${escapeHtml(wrong.note || '')}</div>`));
  state.studyLogs.forEach((log) => add(log.date, `<div class="archive-card__meta-line"><span class="badge badge--blue">TOEFL</span><span>${escapeHtml(log.book)} · ${escapeHtml(log.day)}</span></div><div class="archive-card__title">${log.totalQuestions} questions</div><div class="archive-card__body">${log.correctQuestions}/${log.totalQuestions} correct · ${log.minutes} min · ${log.newWords} new words</div>`));
  return groups;
}

function uid() {
  return crypto?.randomUUID ? crypto.randomUUID() : `id-${Math.random().toString(36).slice(2, 10)}`;
}

function offsetDate(days) {
  return toISODate(addDays(new Date(), days));
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function startOfWeek(date) {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function todayISO() {
  return toISODate(new Date());
}

function dayNumberFor(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  const yearStart = new Date(date.getFullYear(), 0, 1);
  return Math.floor((date - yearStart) / 86400000) + 1;
}

function shortDayLabel(date) {
  return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][date.getDay()];
}

function formatCompactDate(date) {
  return `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}.${shortDayLabel(date)}`;
}

function formatArchiveLabel(date) {
  const value = new Date(`${date}T00:00:00`);
  return `${String(value.getMonth() + 1).padStart(2, '0')} / ${String(value.getDate()).padStart(2, '0')} / ${value.getFullYear()}`;
}

function formatTime(date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);
}

function currentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function timeToMinutes(value) {
  if (!value) return -1;
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

function byDateAndTime(a, b) {
  if (a.date !== b.date) return b.date.localeCompare(a.date);
  const aTime = a.time || a.startTime || '';
  const bTime = b.time || b.startTime || '';
  return aTime.localeCompare(bTime);
}

function byStartTime(a, b) {
  return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
}

function compareStrings(a, b) {
  return String(a).localeCompare(String(b), 'en', { sensitivity: 'base' });
}

function normalizeReason(value) {
  return String(value || '').replace(/\s*\/\s*/g, ' / ').trim().toLowerCase();
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('\n', ' ');
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function wordSeed(word, meaning, pos, paraphrase, example, sourceDay, importance, status, reviewScore) {
  return {
    id: uid(),
    word,
    meaning,
    pos,
    paraphrase,
    example,
    sourceDay,
    importance,
    status,
    reviewScore,
    nextReviewAt: offsetDate(reviewScore <= 1 ? 0 : reviewScore >= 4 ? 5 : 2),
    lastReviewed: reviewScore >= 4 ? offsetDate(0) : ''
  };
}

function wrongSeed(date, type, question, myAnswer, correctAnswer, reason, note, linkedVocabulary) {
  return {
    id: uid(),
    date,
    type,
    question,
    myAnswer,
    correctAnswer,
    reason,
    note,
    linkedVocabulary
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    els.toast.classList.remove('is-visible');
  }, 1800);
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('sw.js').then(() => {
    els.syncStatus.textContent = 'PWA READY';
  }).catch(() => {
    els.syncStatus.textContent = 'LOCAL';
  });
}
