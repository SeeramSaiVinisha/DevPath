# Jenkins Freestyle jobs

Create these jobs to demonstrate Module 3 and upstream/downstream relationships.

## Job A: DevPath-Backend-Build
- New Item → Freestyle project.
- Configure Git repository URL under Source Code Management.
- Add build step: Execute shell (Linux agent):
  `cd backend && mvn -B clean test package`
- Add post-build action to trigger `DevPath-Pipeline` only after a stable/successful build.

## Job B: DevPath-Quiz-Test
- Add a build step:
  `cd quiz-service && python3 -m pip install -r requirements.txt && python3 -m unittest discover -s tests -v`

## Job C: DevPath-Pipeline
- Pipeline → Pipeline script from SCM → Git → script path `Jenkinsfile`.
- Ensure the agent has Maven, Python, and Docker installed and available.
- If your Jenkins agent is Windows, adapt `sh` commands to `bat` and use `python` instead of `python3`.

Avoid triggering Job A and Job C in a loop. Configure only one direction for the upstream/downstream demonstration.
