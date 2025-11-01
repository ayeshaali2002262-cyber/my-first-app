export function convertTextToBulletPoints(text: string): string[] {
  if (!text || text.trim().length === 0) {
    return ["No text detected in this slide"];
  }

  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  if (lines.length === 0) {
    return ["No text detected in this slide"];
  }

  const bulletPoints: string[] = [];
  let currentPoint = "";
  let currentSubPoints: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = i < lines.length - 1 ? lines[i + 1] : null;

    const isTitle = 
      line.length < 100 &&
      (line === line.toUpperCase() || 
       /^[A-Z]/.test(line) && 
       (!nextLine || nextLine.length > line.length * 1.5));

    const isBulletOrNumber = /^[\-\*\•\◦\▪\→\➤\✓\✔]/.test(line) || /^\d+[\.\)]/.test(line);

    const isShortPhrase = line.length < 80 && !line.endsWith(".");

    if (isTitle && line.length > 3) {
      if (currentPoint) {
        if (currentSubPoints.length > 0) {
          bulletPoints.push(currentPoint);
          bulletPoints.push(...currentSubPoints.map(sp => `  • ${sp}`));
          currentSubPoints = [];
        } else {
          bulletPoints.push(currentPoint);
        }
      }
      currentPoint = `**${line}**`;
    } else if (isBulletOrNumber) {
      if (currentPoint && currentPoint !== `**${line}**`) {
        if (currentSubPoints.length > 0) {
          bulletPoints.push(currentPoint);
          bulletPoints.push(...currentSubPoints.map(sp => `  • ${sp}`));
          currentSubPoints = [];
        } else {
          bulletPoints.push(currentPoint);
        }
      }
      const cleanedLine = line.replace(/^[\-\*\•\◦\▪\→\➤\✓\✔]\s*/, "").replace(/^\d+[\.\)]\s*/, "");
      currentPoint = cleanedLine;
    } else if (isShortPhrase && currentPoint) {
      currentSubPoints.push(line);
    } else {
      if (currentPoint) {
        if (currentSubPoints.length > 0) {
          bulletPoints.push(currentPoint);
          bulletPoints.push(...currentSubPoints.map(sp => `  • ${sp}`));
          currentSubPoints = [];
        } else {
          bulletPoints.push(currentPoint);
        }
      }

      const sentences = line.match(/[^.!?]+[.!?]+/g) || [line];
      
      sentences.forEach(sentence => {
        const trimmed = sentence.trim();
        if (trimmed.length > 0) {
          if (trimmed.length > 150) {
            const parts = trimmed.split(/,\s+(?=[A-Z])/);
            parts.forEach(part => {
              if (part.trim().length > 0) {
                bulletPoints.push(part.trim());
              }
            });
          } else {
            bulletPoints.push(trimmed);
          }
        }
      });
      
      currentPoint = "";
    }
  }

  if (currentPoint) {
    if (currentSubPoints.length > 0) {
      bulletPoints.push(currentPoint);
      bulletPoints.push(...currentSubPoints.map(sp => `  • ${sp}`));
    } else {
      bulletPoints.push(currentPoint);
    }
  } else if (currentSubPoints.length > 0) {
    bulletPoints.push(...currentSubPoints);
  }

  const finalPoints = bulletPoints
    .filter(point => point.trim().length > 0)
    .map(point => {
      if (point.startsWith("  • ")) {
        return point;
      }
      if (point.startsWith("**") && point.endsWith("**")) {
        return point;
      }
      return point;
    });

  return finalPoints.length > 0 ? finalPoints : ["No meaningful content detected"];
}

export function formatBulletPoint(point: string, index: number): string {
  if (point.startsWith("  • ")) {
    return point;
  }
  if (point.startsWith("**") && point.endsWith("**")) {
    return point;
  }
  return `• ${point}`;
}
