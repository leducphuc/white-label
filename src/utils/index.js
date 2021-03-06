export const getHeaders = () => {
  if (localStorage.getItem('user_token_access')) {
    return {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('token_access'),
    };
  }
  return {
    'Content-Type': 'application/json',
    'X-AUTH-TOKEN': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJpc3N1ZXIiLCJzdWIiOiJzdWJqZWN0IiwiYXVkIjoiYXVkaWVuY2UiLCJleHAiOjE1MzY0MDQwNjcsIm5iZiI6MTUyODc4OTc2NywidHJhZGluZ0V4cCI6MCwiaWRnSWQiOiIwMDAxNzI4MTcwIiwicm9sZXMiOiJbT05MSU5FX1RSQURJTkcsIFJPTEVfT05MSU5FX1RSQURJTkcsIE9OTElORV9WSUVXX0FDQ09VTlRfSU5GTywgUk9MRV9PTkxJTkVfVklFV19BQ0NPVU5UX0lORk9dIiwiYWNjb3VudFR5cGUiOiJXaGl0ZUxhYmVsTWFzdGVyIiwiY3VzdG9tZXJJZCI6IjAxMDE4MDE2NDMiLCJ1c2VySWQiOiJudWxsIiwidmVyc2lvbiI6IlYyIiwiY3VzdG9tZXJOYW1lIjoid2hpdGVsYWJlbC10ZXN0LTAwMSIsImVtYWlsIjoid2hpdGVsYWJlbC10ZXN0LTAwMUBtYWlsaW5hdG9yLmNvbSIsInVzZXJuYW1lIjoid2hpdGVsYWJlbG1hc3RlciIsInN0YXR1cyI6Ik9OTElORV9BQ1RJVkUifQ.dWKHyu74EkykWIIAbkqely2mCFO_xbXJ0BUignnMUC7yMo35nJSH6qmFxCczAQWJqBTrQjdj6LBikji71epyeoLYw437qoGEY8R85dnnGqacvxPIvVU31RtSfHaDlRAGfEUAsr3CcG2ZVuAsgpajfwcxrjxmefojcD9BQoltWZfJDyIc9vuFF6ZzbwcsqQPM_B5oXZApmJDeQAfrcSQCncbi3Zsak_X39OAbFn1aB8r3i1Q3GmSN5ocyObp1q4nFVLQjc3rYIBbdyPxUO77IZHGhhRnuBr_ZPQh06WnTU-jcZLolTnNTl0NbtjF02zDkfcDVOLzjRz8hfemMm7i6Fg',
  };
};
