export const formatDateDifference = (createdAt) => {
  if (!createdAt) return ''; // Return an empty string if createdAt is null or undefined

  const currentTime = new Date();
  const notificationTime = new Date(createdAt);

  // Calculate the time difference in seconds
  const timeDifference =
    (currentTime.getTime() - notificationTime.getTime()) / 1000;

  // Format the output based on the time difference
  if (timeDifference < 60) {
    return `Just now`;
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes}min`;
  } else if (timeDifference < 43200) {
    // Less than 12 hours
    return notificationTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  } else {
    // For dates older than 12 hours, return a formatted date
    const day = notificationTime.getDate();
    const month = notificationTime.toLocaleString('default', {
      month: 'short',
    });
    return `${day} ${month}`;
  }
};
