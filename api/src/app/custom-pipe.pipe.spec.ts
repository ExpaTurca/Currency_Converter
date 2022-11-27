import { ObjJsonPipe } from './custom-pipe.pipe';

describe('CustomPipePipe', () => {
  it('create an instance', () => {
    const pipe = new ObjJsonPipe();
    expect(pipe).toBeTruthy();
  });
});
