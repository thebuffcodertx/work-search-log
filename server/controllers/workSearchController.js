import * as WorkSearch from '../models/WorkSearch.js';

const TEMP_USER_ID = 1; // replaced with the logged-in user once auth is added

const ACTIVITY_TYPES = ['Application', 'Interview Prep', 'Job Fair', 'Networking', 'Workshop/Training', 'Other'];
const PLATFORMS = ['LinkedIn', 'Indeed', 'ZipRecruiter', 'Company Website', 'Referral', 'Job Fair', 'Other'];
const WORK_TYPES = ['Remote', 'Hybrid', 'On-site'];
const STATUSES = ['Interested', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected', 'Withdrawn'];

// Returns an array of error messages; empty array means the data is valid
function validate(data) {
  const errors = [];
  const activityType = data.activityType ?? 'Application';

  if (!ACTIVITY_TYPES.includes(activityType)) errors.push('Invalid activityType');
  if (!data.activityDate) errors.push('activityDate is required');

  if (activityType === 'Application') {
    if (!data.companyName) errors.push('companyName is required for applications');
    if (!data.jobTitle) errors.push('jobTitle is required for applications');
  }

  if (data.platform && !PLATFORMS.includes(data.platform)) errors.push('Invalid platform');
  if (data.workType && !WORK_TYPES.includes(data.workType)) errors.push('Invalid workType');
  if (data.status && !STATUSES.includes(data.status)) errors.push('Invalid status');
  if (data.contactEmail && !/^\S+@\S+\.\S+$/.test(data.contactEmail)) errors.push('Invalid contactEmail');

  return errors;
}

// GET /api/work-searches?from=&to=&status=&role=
export async function getAll(req, res) {
  try {
    const { from, to, status, role } = req.query;
    const workSearches = await WorkSearch.findAll(TEMP_USER_ID, { from, to, status, role });
    res.status(200).json(workSearches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch work searches' });
  }
}

// GET /api/work-searches/:id
export async function getOne(req, res) {
  try {
    const workSearch = await WorkSearch.findById(req.params.id, TEMP_USER_ID);
    if (!workSearch) return res.status(404).json({ error: 'Work search not found' });
    res.status(200).json(workSearch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch work search' });
  }
}

// POST /api/work-searches
export async function create(req, res) {
  try {
    const errors = validate(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const data = { ...req.body, activityType: req.body.activityType ?? 'Application' };
    const workSearch = await WorkSearch.create(TEMP_USER_ID, data);
    res.status(201).json(workSearch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create work search' });
  }
}

// PUT /api/work-searches/:id
export async function update(req, res) {
  try {
    const errors = validate(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const data = { ...req.body, activityType: req.body.activityType ?? 'Application' };
    const workSearch = await WorkSearch.update(req.params.id, TEMP_USER_ID, data);
    if (!workSearch) return res.status(404).json({ error: 'Work search not found' });
    res.status(200).json(workSearch);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update work search' });
  }
}

// DELETE /api/work-searches/:id
export async function remove(req, res) {
  try {
    const deleted = await WorkSearch.remove(req.params.id, TEMP_USER_ID);
    if (!deleted) return res.status(404).json({ error: 'Work search not found' });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete work search' });
  }
}