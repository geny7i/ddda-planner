import ContainerWithSidebar from 'components/ContainerWithSidebar';
import { Row, Col } from 'react-bootstrap';

function Disclaimer() {
  return (
    <ContainerWithSidebar>
      <Row className="justify-content-md-center">
        <Col xs lg="8">
          <h2 className="mt-5">免責事項</h2>
          <p>
            本ツールは『ドラゴンズドグマ:ダークアリズン』（開発・販売：カプコン株式会社）のファンによる非公式の活動であり、カプコン株式会社またはその関連会社とは一切関係がありません。『ドラゴンズドグマ:ダークアリズン』は、カプコン株式会社の登録商標です。
          </p>
          <p>
            本ツールを用いて生じた、いかなる損害についても一切責任を負いかねます。
          </p>
          <p>本ツールの内容は、予告なく変更される場合があります。</p>
          <p>
            開発者: <a href="https://github.com/geny7i">geny7i</a>
          </p>
          <p>
            不具合報告やフィードバック等は
            <a href="https://github.com/geny7i/ddda-planner">
              githubリポジトリ
            </a>
            のissueにお願いします。
          </p>

          <hr />

          <h2 className="mt-5">Disclaimer</h2>
          <p>
            This tool is an unofficial fan activity for "Dragon's Dogma: Dark
            Arisen" (developed and sold by Capcom Co., Ltd.) and is not
            affiliated in any way with Capcom Co., Ltd. or its subsidiaries.
            "Dragon's Dogma: Dark Arisen" is a registered trademark of Capcom
            Co., Ltd.
          </p>
          <p>
            I am not responsible for any damage that may arise from the use of
            this tool.
          </p>
          <p>The contents of this tool are subject to change without notice.</p>
          <p>
            Developer: <a href="https://github.com/geny7i">geny7i</a>
          </p>
          <p>
            For bug reports and feedback, please use the issue of the{' '}
            <a href="https://github.com/geny7i/ddda-planner">
              GitHub repository
            </a>
            .
          </p>
        </Col>
      </Row>
    </ContainerWithSidebar>
  );
}

export default Disclaimer;
